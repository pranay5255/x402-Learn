import { config } from "dotenv";
import express from "express";
// Import the paymentMiddleware from the x402-express package to use the payment middleware
import { paymentMiddleware } from "x402-express";
// Import the facilitator from the x402 package to use the mainnet facilitator
import { facilitator } from "@coinbase/x402";
import { generateText, getPromptConfig } from "./openrouter";
import { EXAMPLE_PROMPTS } from "./prompt{edit}";

config();

const payToAddress = process.env.ADDRESS as `0x${string}`;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4021;

// Validate required environment variables
if (!payToAddress || !process.env.CDP_API_KEY_ID || !process.env.CDP_API_KEY_SECRET) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();
app.use(express.json());

// ============================================================================
// FREE ENDPOINTS (no payment required)
// ============================================================================

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "x402 OpenRouter Server is running!",
    endpoints: {
      "/": "This info page (free)",
      "/config": "View current prompt configuration (free)",
      "POST /generate-text": "Generate AI text ($0.01 USDC on Base)",
    },
    examplePrompts: EXAMPLE_PROMPTS,
  });
});

// Config endpoint - shows current prompt settings (useful for debugging)
app.get("/config", (req, res) => {
  const promptConfig = getPromptConfig();
  res.json({
    message: "Current prompt configuration (from src/prompt{edit}.ts)",
    config: {
      systemPrompt: promptConfig.systemPrompt,
      defaultUserPrompt: promptConfig.defaultUserPrompt,
      model: promptConfig.model,
      temperature: promptConfig.settings.temperature,
      maxTokens: promptConfig.settings.max_tokens,
    },
    editInstructions: "Edit src/prompt{edit}.ts on GitHub to customize these settings!",
  });
});

// ============================================================================
// PAID ENDPOINTS (require x402 payment)
// ============================================================================

// Configure payment middleware with price map
app.use(
  paymentMiddleware(
    payToAddress,
    {
      "POST /generate-text": {
        // USDC amount in dollars
        price: "$0.01",
        network: "base",
      },
    },
    // Pass the mainnet facilitator to the payment middleware
    facilitator,
  ),
);

// POST /generate-text route
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing or invalid 'prompt' in request body",
      });
    }

    const result = await generateText(prompt, model);

    res.json({
      success: true,
      model: result.model,
      output: result.content,
    });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({
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
║                                                               ║
║  Free Endpoints:                                              ║
║    GET  /         → Server info & example prompts             ║
║    GET  /config   → View current prompt configuration         ║
║                                                               ║
║  Paid Endpoints ($0.01 USDC on Base):                         ║
║    POST /generate-text → Generate AI text                     ║
║                                                               ║
║  💡 Edit src/prompt{edit}.ts on GitHub to customize prompts!  ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
