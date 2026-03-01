import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined" || GEMINI_API_KEY.length < 10) {
      return NextResponse.json({ 
        error: "Invalid or missing GEMINI_API_KEY. Please check your Secrets tab." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Using 'gemini-1.5-flash-8b' - it's newer and often bypasses the 404 issues of the main flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

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
    
    // Extracting the most useful part of the error message
    const errorMessage = error.message || "Unknown Gemini Error";
    return NextResponse.json({ 
      error: `Gemini Error: ${errorMessage}. If this is a 404, your API key might not have access to the 8B model yet.` 
    }, { status: 500 });
  }
}