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

    // Call Grok API with streaming enabled
    const resp = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-4-latest",
        messages: [
          {
            role: "system",
            content: "You are an expert career coach and resume writer.",
          },
          {
            role: "user",
            content: `User Profile:\n${userProfile}\n\nJob Description:\n${jobDescription}`,
          },
        ],
        stream: true,
        temperature: 0,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Grok API error:", text);
      return NextResponse.json(
        { error: "Failed to fetch Grok API" },
        { status: resp.status }
      );
    }

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

            // The API is expected to send data in SSE format: data: {...}\n\n
            // Parse each line that starts with "data: "
            const lines = chunk.split("\n").filter((line) => line.trim() !== "");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.replace(/^data: /, "").trim();
                if (dataStr === "[DONE]") {
                  controller.close();
                  return;
                }
                try {
                  const data = JSON.parse(dataStr);
                  const content = data.choices?.[0]?.delta?.content;
                  if (content) {
                    const encoded = new TextEncoder().encode(content);
                    controller.enqueue(encoded);
                  }
                } catch (e) {
                  // Ignore JSON parse errors for partial data
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
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}