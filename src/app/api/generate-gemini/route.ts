import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    // Server-side logging to verify if the key is being picked up
    if (GEMINI_API_KEY && GEMINI_API_KEY !== "undefined") {
      console.log(`[gemini-api] ✅ Key detected. Proceeding with generation.`);
    } else {
      console.error("[gemini-api] ❌ Key is missing from process.env");
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is missing. Please add it to the 'Secrets' tab in the UI and click RESTART." 
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
    console.error("[gemini-api] Error:", error);
    return NextResponse.json({ error: "Gemini API Error: " + (error.message || "Unknown error") }, { status: 500 });
  }
}