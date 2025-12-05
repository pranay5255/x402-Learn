import { config } from "dotenv";
import {
  SYSTEM_PROMPT,
  DEFAULT_USER_PROMPT,
  MODEL_OVERRIDE,
  GENERATION_SETTINGS,
} from "./prompt{edit}";

config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = MODEL_OVERRIDE || process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

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
 * @param prompt - The user's prompt (uses DEFAULT_USER_PROMPT if empty)
 * @param model - Optional model override (defaults to OPENROUTER_MODEL)
 * @returns Promise with model, content, and raw response
 */
export async function generateText(prompt: string, model?: string): Promise<GenerateTextResult> {
  const selectedModel = model || OPENROUTER_MODEL;
  const userPrompt = prompt || DEFAULT_USER_PROMPT;

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
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: GENERATION_SETTINGS.temperature,
      max_tokens: GENERATION_SETTINGS.max_tokens,
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

/**
 * Get the current prompt configuration
 * Useful for debugging and displaying current settings
 *
 * @returns Current prompt configuration object
 */
export function getPromptConfig() {
  return {
    systemPrompt: SYSTEM_PROMPT,
    defaultUserPrompt: DEFAULT_USER_PROMPT,
    model: OPENROUTER_MODEL,
    settings: GENERATION_SETTINGS,
  };
}
