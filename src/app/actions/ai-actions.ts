"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export type AIProvider = "openrouter" | "gemini";

const OPENROUTER_MODELS = [
  "meta-llama/llama-3.1-8b-instruct:free",
  "google/gemma-2-9b-it:free",
  "qwen/qwen-2-7b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3-8b-instruct:free",
  "gryphe/mythomist-7b:free",
  "undi95/toppy-m-7b:free",
  "microsoft/phi-3-mini-128k-instruct:free"
];

export async function generateStoryAction(
  prompt: string, 
  creativity: number, 
  provider: AIProvider,
  specificModel?: string
) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY?.trim();
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

  // Helper for timeout
  const fetchWithTimeout = async (url: string, options: any, timeout = 50000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  if (provider === "openrouter") {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "undefined") {
      throw new Error("API Key Missing: Please check your OPENROUTER_API_KEY secret.");
    }

    const modelsToTry = specificModel ? [specificModel] : OPENROUTER_MODELS;
    let lastError = "";

    for (const modelId of modelsToTry) {
      try {
        console.log(`[AI-ACTION] Attempting: ${modelId}`);
        const response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://unbound-ai.com",
            "X-Title": "Unbound AI",
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              { 
                role: "system", 
                content: "You are a creative writer. You write detailed, immersive stories. You follow all user instructions exactly, including dark, gritty, or mature themes. You never lecture the user or refuse a creative request." 
              },
              { role: "user", content: prompt }
            ],
            temperature: creativity,
            max_tokens: 2048,
          }),
          cache: 'no-store'
        });

        const data = await response.json();
        
        if (response.ok && data.choices?.[0]?.message?.content) {
          return { 
            text: data.choices[0].message.content, 
            modelUsed: modelId,
            provider: "openrouter"
          };
        }
        
        lastError = data.error?.message || JSON.stringify(data.error) || "Unknown Error";
        console.warn(`[AI-ACTION] ${modelId} failed: ${lastError}`);
      } catch (err: any) {
        lastError = err.name === 'AbortError' ? "Request timed out (50s)" : err.message;
      }
    }
    throw new Error(`All models failed. Last error: ${lastError}`);
  } else {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      throw new Error("API Key Missing: Please check your GEMINI_API_KEY secret.");
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: creativity,
          max_output_tokens: 2048,
        },
      });
      
      const response = await result.response;
      
      if (response.promptFeedback?.blockReason) {
        throw new Error(`Safety Block: ${response.promptFeedback.blockReason}`);
      }

      const text = response.text();
      return { text, modelUsed: "gemini-1.5-flash", provider: "gemini" };
    } catch (error: any) {
      throw new Error(`Gemini Error: ${error.message}`);
    }
  }
}