import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is missing. Please add it to the 'Secrets' tab." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Using 'gemini-1.5-flash' explicitly. If 404 persists, it's often an API key restriction or region issue.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: creativity || 0.7,
        max_output_tokens: 2048,
      },
    });
    
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("[gemini-api] Error:", error);
    
    // If gemini-1.5-flash fails with 404, it might be because the project doesn't have access to that specific model name
    const errorMessage = error.message || "Unknown Gemini Error";
    return NextResponse.json({ 
      error: `Gemini Error: ${errorMessage}. Try switching to OpenRouter if this persists.` 
    }, { status: 500 });
  }
}