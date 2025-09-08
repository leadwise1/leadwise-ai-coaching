import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { jobDescription, userProfile } = await request.json();

    if (!jobDescription || !userProfile) {
      return NextResponse.json(
        { error: "Missing jobDescription or userProfile" },
        { status: 400 }
      );
    }

    // Call Grok API
    const resp = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          {
            role: "system",
            content:
              "You are an expert career coach and resume writer. Generate a concise, compelling resume summary (3-4 sentences).",
          },
          {
            role: "user",
            content: `User Profile:\n${userProfile}\n\nJob Description:\n${jobDescription}`,
          },
        ],
      }),
    });

    const data = await resp.json();

    const summary =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a summary.";

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}