import { VertexAI } from '@google-cloud/vertexai';
import { NextResponse } from 'next/server';

// --- Best Practice: Environment Variable Validation ---
// Ensure required environment variables are set at startup. This prevents
// runtime errors within the request handler.
const project = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.GOOGLE_CLOUD_LOCATION;

if (!project || !location) {
  // This error will be thrown when the serverless function is initialized,
  // making it clear that the configuration is missing.
  throw new Error('Missing required environment variables: GOOGLE_CLOUD_PROJECT_ID or GOOGLE_CLOUD_LOCATION');
}

// --- Best Practice: Initialize clients outside the handler ---
// This allows the client instance to be reused across multiple function invocations,
// improving performance by avoiding re-initialization on every request.
const vertex_ai = new VertexAI({ project, location });
const model = 'gemini-1.0-pro'; // Use a stable, generally available model

const generativeModel = vertex_ai.getGenerativeModel({ model });

// A helper function to keep the prompt logic separate and clean.
const createPrompt = (userProfile: string, jobDescription: string) => `
      You are an expert career coach and resume writer.
      Based on the following user profile and job description, generate a compelling, tailored resume summary (3-4 sentences) that highlights the user's most relevant skills and achievements.

      **User Profile:**
      ${userProfile}

      **Job Description:**
      ${jobDescription}

      **Resume Summary:**
    `;

// This function will be called by your frontend components
export async function POST(request: Request) {
  try {
    const { jobDescription, userProfile } = await request.json();

    // More robust input validation to ensure we have non-empty strings.
    if (typeof jobDescription !== 'string' || !jobDescription.trim() || typeof userProfile !== 'string' || !userProfile.trim()) {
      return NextResponse.json(
        { error: 'jobDescription and userProfile must be non-empty strings' },
        { status: 400 }
      );
    }

    const prompt = createPrompt(userProfile, jobDescription);

    const resp = await generativeModel.generateContent(prompt);

    // Improved response handling for better debugging.
    if (!resp.response.candidates || resp.response.candidates.length === 0) {
        console.error('Vertex AI Error: No candidates in response', resp.response);
        return NextResponse.json(
            { error: 'Failed to generate summary. The AI model returned no candidates.' },
            { status: 500 }
        );
    }

    const summary = resp.response.candidates[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      console.error('Vertex AI Error: No text in response candidate', resp.response.candidates[0]);
      return NextResponse.json(
        { error: 'Failed to generate summary from the AI model.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    // Provide a generic error to the client for security.
    return NextResponse.json({ error: 'An internal server error occurred while processing your request.' }, { status: 500 });
  }
}
