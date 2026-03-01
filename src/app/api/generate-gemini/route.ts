import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    // Log for server-side debugging
    if (GEMINI_API_KEY) {
      console.log(`[gemini-api] ✅ GEMINI_API_KEY detected (Length: ${GEMINI_API_KEY.length})`);
    } else {
      console.error("[gemini-api] ❌ CRITICAL: GEMINI_API_KEY is NOT found in process.env");
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY MISSING: Please add 'GEMINI_API_KEY' to your Secrets tab and click RESTART." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: creativity || 0.7,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent([
      "You are a creative storyteller. Write a detailed, immersive story based on the following prompt. Be descriptive and engaging.",
      prompt
    ]);
    
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("[gemini-api] Unexpected Error:", error);
    return NextResponse.json({ error: "Gemini API Error: " + (error.message || "Unknown error") }, { status: 500 });
  }
}