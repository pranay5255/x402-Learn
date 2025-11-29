import { config } from "dotenv";
import express from "express";
// Import the paymentMiddleware from the x402-express package to use the payment middleware
import { paymentMiddleware } from "x402-express";
// Import the facilitator from the x402 package to use the mainnet facilitator
import { facilitator } from "@coinbase/x402";
import { generateText } from "./openrouter";

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
  console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
