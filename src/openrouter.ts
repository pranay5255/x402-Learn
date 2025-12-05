import { config } from "dotenv";

config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo";

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

interface OpenRouterResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface GenerateTextResult {
  model: string;
  content: string;
  raw: OpenRouterResponse;
}

/**
 * Generate text using OpenRouter API
 *
 * @param prompt - The user's prompt
 * @param model - Optional model override (defaults to OPENROUTER_MODEL env var)
 * @returns Promise with model, content, and raw response
 */
export async function generateText(prompt: string, model?: string): Promise<GenerateTextResult> {
  const selectedModel = model || OPENROUTER_MODEL;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER || "",
      "X-Title": process.env.OPENROUTER_X_TITLE || "",
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  const data: OpenRouterResponse = await response.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("No choices returned from OpenRouter API");
  }

  return {
    model: data.model,
    content: data.choices[0].message.content,
    raw: data,
  };
}
