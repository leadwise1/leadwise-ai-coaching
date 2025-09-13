import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobDescription, userProfile } = body;

    if (!jobDescription || !userProfile) {
      return NextResponse.json(
        { error: "Missing jobDescription or userProfile" },
        { status: 400 }
      );
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "API key not found. Please set GEMINI_API_KEY in your environment variables." }, { status: 500 });
    }
    
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:streamGenerateContent?key=${apiKey}&alt=sse`;

    const payload = {
      contents: [{
        parts: [{
          text: `User Profile:\n${userProfile}\n\nJob Description:\n${jobDescription}`
        }]
      }],
      systemInstruction: {
        parts: [{
          text: "You are an expert career coach and resume writer. Analyze the user profile against the job description and provide detailed suggestions for improving their resume."
        }]
      }
    };

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Gemini API error:", text);
      return NextResponse.json(
        { error: "Failed to fetch Gemini API" },
        { status: resp.status }
      );
    }

    // Stream the response from Gemini
    const stream = new ReadableStream({
      async start(controller) {
        const reader = resp.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) {
          controller.error("No reader from response body");
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.substring(6).trim();
                try {
                  const data = JSON.parse(dataStr);
                  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (content) {
                    const encoded = new TextEncoder().encode(content);
                    controller.enqueue(encoded);
                  }
                } catch (e) {
                  // Ignore JSON parse errors for partial chunks
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });

  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}