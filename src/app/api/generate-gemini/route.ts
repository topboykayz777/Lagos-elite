import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const { prompt, creativity } = await req.json();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is missing. Please add it to the 'Secrets' tab in the UI and click RESTART." 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Using the most stable model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
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
    console.error("[gemini-api] Detailed Error:", error);
    
    // Handle specific 404 error with a better message
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return NextResponse.json({ 
        error: "Gemini Model Not Found: Your API key might not have access to 'gemini-1.5-flash' yet, or it's not available in your region. Try using OpenRouter instead." 
      }, { status: 404 });
    }

    return NextResponse.json({ error: "Gemini API Error: " + (error.message || "Unknown error") }, { status: 500 });
  }
}