import { config } from "dotenv";
import {
  SYSTEM_PROMPT,
  DEFAULT_USER_PROMPT,
  MODEL_OVERRIDE,
  GENERATION_SETTINGS,
  EXAMPLE_PROMPTS,
  AGENT_PROFILE,
  AGENT_EXAMPLES,
} from "./prompt{edit}";

config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = MODEL_OVERRIDE || process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

interface OpenRouterContentPart {
  [key: string]: unknown;
  type?: string;
  text?: string;
  content?: string;
}

interface OpenRouterResponse {
  id: string;
  model: string;
  choices: Array<{
    message?: {
      role?: string;
      // Some models (including Amazon Nova) return content as an array of blocks
      content?: string | OpenRouterContentPart[];
    };
    // Some providers return the text directly on the choice
    content?: string;
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
  const startedAt = Date.now();

  console.info("[openrouter] request", {
    model: selectedModel,
    promptLength: userPrompt.length,
    hasOverride: Boolean(model),
  });

  try {
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

    // Normalize model responses that return segmented content (e.g., Amazon Nova)
    const extractContent = (choice: OpenRouterResponse["choices"][number]): string => {
      // Direct string on choice
      if (typeof choice.content === "string" && choice.content.trim()) {
        return choice.content.trim();
      }

      const messageContent = choice.message?.content;

      // Simple string content
      if (typeof messageContent === "string" && messageContent.trim()) {
        return messageContent.trim();
      }

      // Array of parts (text blocks, etc.)
      if (Array.isArray(messageContent)) {
        const text = messageContent
          .map(part => {
            if (typeof part === "string") return part;
            if (part && typeof part === "object") {
              if (typeof part.text === "string") return part.text;
              if (typeof part.content === "string") return part.content;
            }
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();

        if (text) return text;
      }

      return "";
    };

    const content = extractContent(data.choices[0]);

    if (!content) {
      throw new Error("Model returned an empty response");
    }

    console.info("[openrouter] response", {
      model: data.model,
      contentPreview: content.slice(0, 80),
      elapsedMs: Date.now() - startedAt,
    });

    return {
      model: data.model,
      content,
      raw: data,
    };
  } catch (error) {
    console.error("[openrouter] error", {
      model: selectedModel,
      elapsedMs: Date.now() - startedAt,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Get the current prompt configuration
 * Useful for debugging and displaying current settings
 *
 * @returns Current prompt configuration object
 */
export function getPromptConfig() {
  return {
    agent: AGENT_PROFILE,
    systemPrompt: SYSTEM_PROMPT,
    defaultUserPrompt: DEFAULT_USER_PROMPT,
    model: OPENROUTER_MODEL,
    settings: GENERATION_SETTINGS,
    examples: {
      prompts: EXAMPLE_PROMPTS,
      guided: AGENT_EXAMPLES,
    },
  };
}
