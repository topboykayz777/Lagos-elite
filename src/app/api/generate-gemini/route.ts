import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is missing. Please add it to the 'Secrets' tab and click RESTART." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // 'gemini-pro' is the most widely compatible model name across different key types
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
    });

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
    
    const errorMessage = error.message || "Unknown Gemini Error";
    return NextResponse.json({ error: `Gemini API Error: ${errorMessage}` }, { status: 500 });
  }
}