import { config } from "dotenv";
import express from "express";
import cors from "cors";
// Import the paymentMiddleware from the x402-express package to use the payment middleware
import { paymentMiddleware } from "x402-express";
// Optional: Coinbase-hosted facilitator for mainnet
import { facilitator } from "@coinbase/x402";
import { generateText, getPromptConfig } from "./openrouter";
import { EXAMPLE_PROMPTS } from "./prompt{edit}";

config();

const payToAddress = process.env.ADDRESS as `0x${string}`;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4021;
const useMainnetFacilitator = process.env.X402_ENV === "mainnet";
const facilitatorUrl = process.env.FACILITATOR_URL || "https://x402.org/facilitator";

// Validate required environment variables
if (!payToAddress) {
  console.error("Missing required ADDRESS environment variable");
  process.exit(1);
}

if (useMainnetFacilitator) {
  if (!process.env.CDP_API_KEY_ID || !process.env.CDP_API_KEY_SECRET) {
    console.error("Mainnet mode requires CDP_API_KEY_ID and CDP_API_KEY_SECRET");
    process.exit(1);
  }
}

const app = express();

// Enable CORS for frontend testing from any origin
app.use(
  cors({
    origin: true, // Allow any origin
    credentials: true,
    exposedHeaders: ["X-PAYMENT", "WWW-Authenticate", "X-Payment-Response"],
    allowedHeaders: ["Content-Type", "X-PAYMENT", "Authorization"],
  }),
);

app.use(express.json());

// ============================================================================
// FREE ENDPOINTS (no payment required)
// ============================================================================

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    status: "online",
    message: "x402 OpenRouter Server is running!",
    endpoints: {
      "/": "This info page (free)",
      "/config": "View current prompt configuration (free)",
      "POST /generate-text": "Generate AI text ($0.001 USDC on Base/Base-Sepolia)",
    },
    examplePrompts: EXAMPLE_PROMPTS,
  });
});

// Config endpoint - shows current prompt settings (useful for debugging)
app.get("/config", (_req, res) => {
  const promptConfig = getPromptConfig();
  res.json({
    message: "Current prompt configuration (from src/prompt{edit}.ts)",
    agent: promptConfig.agent,
    prompts: {
      system: promptConfig.systemPrompt,
      defaultUser: promptConfig.defaultUserPrompt,
    },
    model: promptConfig.model,
    generation: {
      temperature: promptConfig.settings.temperature,
      maxTokens: promptConfig.settings.max_tokens,
    },
    examples: promptConfig.examples,
    editInstructions: "Edit src/prompt{edit}.ts on GitHub to customize these settings!",
  });
});

// ============================================================================
// PAID ENDPOINTS (require x402 payment)
// ============================================================================

type FacilitatorOption = Parameters<typeof paymentMiddleware>[2];

// Choose facilitator: testnet by default, mainnet when X402_ENV=mainnet
const facilitatorConfig: FacilitatorOption = useMainnetFacilitator
  ? facilitator
  : {
      url: facilitatorUrl as `${string}://${string}`,
    };

console.info("[server] payment config", {
  payTo: `${payToAddress.slice(0, 6)}...${payToAddress.slice(-4)}`,
  network: useMainnetFacilitator ? "base" : "base-sepolia",
  facilitator: useMainnetFacilitator ? "coinbase-hosted" : facilitatorUrl,
});

app.use(
  paymentMiddleware(
    payToAddress,
    {
      "POST /generate-text": {
        // USDC amount in dollars
        price: "$0.001",
        network: useMainnetFacilitator ? "base" : "base-sepolia",
        // Optional metadata improves discovery in x402 Bazaar
        config: {
          description: "Generate AI text with your chosen prompt and model",
          // Extra metadata fields are kept as a generic record to preserve discovery hints
          inputSchema: {
            type: "object",
            properties: {
              prompt: { type: "string", description: "User prompt to send to the model" },
              model: { type: "string", description: "Optional OpenRouter model override" },
            },
            required: ["prompt"],
          },
          outputSchema: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              model: { type: "string" },
              output: { type: "string" },
            },
          },
          maxTimeoutSeconds: 90,
        } as Record<string, unknown>,
      },
    },
    facilitatorConfig,
  ),
);

// POST /generate-text route
app.post("/generate-text", async (req, res) => {
  try {
    const startedAt = Date.now();
    const { prompt, model } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing or invalid 'prompt' in request body",
      });
    }

    console.info("[server] /generate-text request", {
      promptLength: prompt.length,
      promptPreview: prompt.slice(0, 80),
      modelOverride: model,
    });

    const result = await generateText(prompt, model);

    console.info("[server] /generate-text response", {
      model: result.model,
      outputPreview: result.content.slice(0, 80),
      elapsedMs: Date.now() - startedAt,
    });

    return res.json({
      success: true,
      model: result.model,
      output: result.content,
    });
  } catch (error) {
    console.error("Error generating text:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           🚀 x402 OpenRouter Server Started!                  ║
╠═══════════════════════════════════════════════════════════════╣
║  Server URL: http://0.0.0.0:${PORT.toString().padEnd(35)}║
║  Network: ${useMainnetFacilitator ? "base (mainnet)" : "base-sepolia (testnet)"}${" ".repeat(
    Math.max(0, 25 - (useMainnetFacilitator ? 22 : 29)),
  )}║
║                                                               ║
║  Free Endpoints:                                              ║
║    GET  /         → Server info & example prompts             ║
║    GET  /config   → View current prompt configuration         ║
║                                                               ║
║  Paid Endpoints ($0.001 USDC on ${useMainnetFacilitator ? "Base" : "Base Sepolia"}):   ║
║    POST /generate-text → Generate AI text                     ║
║                                                               ║
║  💡 Edit src/prompt{edit}.ts on GitHub to customize prompts!  ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
