# x402-openrouter-starter

A starter template for building paid API endpoints using x402 payment middleware with OpenRouter AI integration. This project demonstrates how to accept USDC payments on Base mainnet using Coinbase's hosted x402 facilitator and integrate with OpenRouter for LLM completions.

## Features

- **x402 Payment Integration**: Accept USDC payments on Base mainnet using Coinbase's hosted facilitator
- **OpenRouter Integration**: Generate text completions using various LLM models via OpenRouter API
- **Express Server**: Simple Express.js server with TypeScript support
- **Type-Safe**: Full TypeScript support with proper type definitions

## Prerequisites

- Node.js v20+ (install via [nvm](https://github.com/nvm-sh/nvm))
- pnpm v10 (install via [pnpm.io/installation](https://pnpm.io/installation))
- CDP API keys (access via [Coinbase Developer Platform](https://docs.cdp.coinbase.com/))
- A valid Ethereum address for receiving payments (Base network)
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai))
- ngrok CLI (for exposing your local server publicly - see [ngrok setup](#ngrok-setup) below)

## Setup

1. **Clone and install dependencies:**

```bash
pnpm install
```

2. **Copy environment variables template:**

```bash
cp .env.example .env
```

3. **Configure your `.env` file:**

Edit `.env` and fill in the following required variables:

- `ADDRESS`: Your Base wallet address (USDC receiver)
- `CDP_API_KEY_ID`: Your Coinbase Developer Platform API key ID
- `CDP_API_KEY_SECRET`: Your Coinbase Developer Platform API key secret
- `OPENROUTER_API_KEY`: Your OpenRouter API key

Optional variables:

- `OPENROUTER_MODEL`: Default LLM model (defaults to `openai/gpt-3.5-turbo`)
- `PORT`: Server port (defaults to `4021`)
- `OPENROUTER_HTTP_REFERER`: HTTP Referer header for OpenRouter
- `OPENROUTER_X_TITLE`: X-Title header for OpenRouter

## Development

Run the development server with hot reload:

```bash
pnpm dev
```

The server will start on `http://0.0.0.0:4021` (or your configured PORT).

## ngrok Setup

To expose your local server publicly so it can be accessed from anywhere on the internet, use ngrok.

### Step 1: Install ngrok CLI

**macOS (with Homebrew):**
```bash
brew install ngrok/ngrok/ngrok
```

**Linux/Windows:**
Download the installer from [ngrok.com/download](https://ngrok.com/download)

### Step 2: Configure ngrok with your auth token

1. Get your auth token from [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Connect your ngrok CLI to your account:

```bash
ngrok config add-authtoken YOUR_NGROK_AUTH_TOKEN
```

### Step 3: Expose your server with ngrok

**Option A: Using the npm script (recommended)**

With your server running on port 4021, open a new terminal and run:

```bash
pnpm ngrok
```

**Option B: Manual command**

```bash
ngrok http 4021
```

You'll see output like:

```
Forwarding    https://e4a1-12-34-56-78.ngrok-free.app -> http://localhost:4021
```

The important part is the public URL: `https://e4a1-12-34-56-78.ngrok-free.app`

This URL is now reachable from anywhere on the internet and tunnels directly to your local Express server.

### Step 4: Test your public API

From any machine (including friends/teammates), they can test the public endpoint:

```bash
curl -X POST https://e4a1-12-34-56-78.ngrok-free.app/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello from a paid AI server exposed with ngrok!"}'
```

Replace the URL with your ngrok URL.

**Expected behavior:**
- x402 will enforce the pricing ($0.01 USDC on Base)
- Once paid, the server calls OpenRouter
- The user gets back a JSON response with the model output

**Note:** The ngrok URL changes each time you restart ngrok (unless you have a paid plan with a static domain).

## Building

Build the TypeScript project:

```bash
pnpm build
```

This compiles TypeScript files from `src/` to `dist/`.

## Production

Run the compiled server:

```bash
pnpm start
```

## API Endpoints

### POST /generate-text

Generate text using OpenRouter's LLM models. This endpoint requires payment via x402.

**Request Body:**
```json
{
  "prompt": "Write a haiku about coding",
  "model": "openai/gpt-4" // optional, defaults to OPENROUTER_MODEL
}
```

**Response:**
```json
{
  "success": true,
  "model": "openai/gpt-4",
  "output": "Code flows like water,\nLogic shapes the digital stream,\nBugs hide in the depths."
}
```

**Price:** $0.01 USDC on Base network

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Project Structure

```
x402-openrouter-starter/
├─ src/
│  ├─ server.ts        # Express server, x402 integration, /generate-text route
│  └─ openrouter.ts    # Helper to call OpenRouter chat completions
├─ scripts/
│  └─ ngrok.sh         # Helper script to run ngrok tunnel
├─ .env.example        # Template for environment variables
├─ package.json        # Dependencies + scripts
├─ tsconfig.json       # TypeScript compiler settings
├─ .gitignore          # Ignore node_modules, dist, .env, etc.
└─ README.md           # This file
```

## File-by-file Purpose

### src/server.ts

- Creates the Express app
- Loads environment variables
- Configures paymentMiddleware from x402-express with:
  - Your payout address on Base (USDC)
  - A price map saying "POST /generate-text costs $0.01 on Base"
  - The Coinbase mainnet facilitator from @coinbase/x402
- Defines the POST /generate-text route:
  - Reads `{ prompt, model? }` from req.body
  - Calls `generateText()` from openrouter.ts
  - Returns JSON: `{ success, model, output }`
- Starts listening on PORT (default 4021) on 0.0.0.0

### src/openrouter.ts

- Loads `OPENROUTER_API_KEY` and optional `OPENROUTER_MODEL` from .env
- Defines an async function `generateText(prompt, model?)` that:
  - POSTs to `https://openrouter.ai/api/v1/chat/completions`
  - Uses standard Chat Completions schema: `messages: [{ role: "user", content: prompt }]`
  - Returns `{ model, content, raw }`, where:
    - `model` = actual model used
    - `content` = first message content from the response
    - `raw` = full raw JSON from OpenRouter (for debugging/extension)

## Testing

You can test the server using any HTTP client that supports x402 payments. Make sure to:

1. Include the x402 payment headers in your request
2. Send a valid payment for $0.01 USDC on Base
3. Include the required `prompt` in the request body

## License

MIT
