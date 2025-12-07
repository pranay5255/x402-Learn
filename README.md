# x402-openrouter-starter

> 🚀 A beginner-friendly template for building **paid AI API endpoints** using the x402 payment protocol.

Accept USDC cryptocurrency payments on Base network and generate AI responses with OpenRouter — all in one seamless flow.

**Perfect for both technical and non-technical users!**

---

## 🎯 What This Does

| Feature | Description |
|---------|-------------|
| 💰 **Micropayments** | Charges **$0.001 USDC** per API request |
| ⚡ **Automatic Payments** | Processed via x402 protocol — no manual invoicing |
| 🏦 **Direct to Wallet** | Payments go straight to your Base wallet |
| 🤖 **AI Powered** | Responses generated via OpenRouter (GPT-4, Claude, etc.) |

### How It Works

```
User makes API request → x402 checks for payment → Payment to YOUR wallet → AI generates response → User gets answer
```

All automatic! 🎉

---

## 📁 Understanding the Files

### ✏️ Files You EDIT (safe to commit)

| File | Purpose |
|------|---------|
| `src/prompt{edit}.ts` | **Your main editing file!** Customize AI personality, prompts, and settings |
| `README.md` | This documentation |

### 🔐 Files You CREATE LOCALLY (⚠️ never commit!)

| File | Purpose |
|------|---------|
| `.env` | Your secret API keys and wallet address |

### 📦 Files You DON'T Touch

| File | Purpose |
|------|---------|
| `src/server.ts` | Express server with x402 payment middleware + CORS |
| `src/openrouter.ts` | OpenRouter API integration |
| `package.json` | Project dependencies |

---

## 🛠️ Setup Guide

### 📋 Prerequisites

Before starting, you'll need:

| Item | Where to Get It |
|------|-----------------|
| Base wallet address | Any Ethereum wallet (MetaMask, Coinbase Wallet) |
| OpenRouter API key | [openrouter.ai/keys](https://openrouter.ai/keys) |

💡 **Tip**: Keep these in a notepad — you'll paste them later!

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/x402-openrouter-starter.git
cd x402-openrouter-starter
```

---

### Step 2: Create Your `.env` File

> ⚠️ **Important**: This file contains secrets. Never commit it to GitHub!

Create a `.env` file in the root directory:

```env
# REQUIRED - Your Base or Base Sepolia wallet address
ADDRESS=0xYourWalletAddressHere

# REQUIRED - OpenRouter API key (get from openrouter.ai/keys)
OPENROUTER_API_KEY=your_openrouter_key

# REQUIRED - Choose your AI model (browse at openrouter.ai/models)
OPENROUTER_MODEL=openai/gpt-4o-mini
```

**Where to get these values:**
- **ADDRESS**: Your Ethereum wallet address (from MetaMask, Coinbase Wallet, etc.)
- **OPENROUTER_API_KEY**: Sign up at [openrouter.ai](https://openrouter.ai) and create an API key
- **OPENROUTER_MODEL**: Browse [available models](https://openrouter.ai/models) and pick one

---

### Step 3: Install & Run

```bash
# Install dependencies
pnpm install

# Start the server
pnpm dev
```

**Success looks like:**

```
╔═══════════════════════════════════════════════════════════════╗
║           🚀 x402 OpenRouter Server Started!                  ║
╚═══════════════════════════════════════════════════════════════╝
Server URL: http://0.0.0.0:4021
```

✅ Your server is running locally!

---

### Step 4: Expose with ngrok (for public access)

To receive payments, your server needs a public URL. Open a **new terminal**:

```bash
# If ngrok is installed
ngrok http 4021

# Or use the built-in script
pnpm ngrok
```

**Copy your public URL** — it looks like:
```
https://abc-123-xyz.ngrok-free.app
```

🌐 This is your public API address that others can pay to use!

---

## 🌐 Browser-Only Setup (GitHub Codespaces)

**No local IDE? No problem!** Run everything from your browser.

### Quick Start

1. **Open Web Editor**: Go to your repo and press `.` (period key)
2. **Create Codespace**: Click `Code → Codespaces → Create codespace`
3. **In the Terminal**:

```bash
# Create your secrets file
cp .env.example .env
# Edit .env with your keys using the editor

# Install and run
pnpm install
pnpm dev
```

4. **Install ngrok** (run this in terminal):

```bash
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com bookworm main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok
```

5. **Start ngrok** in another terminal: `ngrok http 4021`

---

## ✏️ Customizing Your AI

The magic happens in **`src/prompt{edit}.ts`** — edit it to change your AI's personality!

### What You Can Customize

**System Prompt** (AI's personality):
```typescript
export const SYSTEM_PROMPT = `You are a friendly pirate AI!
You speak in pirate slang and love to say "Arrr!"
Help users with their questions, matey!`;
```

**Default Response**:
```typescript
export const DEFAULT_USER_PROMPT = `Ahoy! What treasure can I help ye find today?`;
```

**Example Prompts**:
```typescript
export const EXAMPLE_PROMPTS = [
  "Tell me a pirate joke!",
  "What's the best crypto treasure?",
];
```

**Model Override** (change the AI model):
```typescript
export const MODEL_OVERRIDE = "anthropic/claude-3-haiku";
```

**Creativity Settings**:
```typescript
export const GENERATION_SETTINGS = {
  temperature: 0.9,  // Higher = more creative (0.0 - 1.0)
  max_tokens: 500,   // Max response length
};
```

> 💡 After editing, restart the server (`Ctrl+C` then `pnpm dev`) to see changes.

---

## 📊 API Reference

### `GET /` — Server Info (Free)

Returns server status and available endpoints.

### `GET /config` — View Configuration (Free)

Returns current prompt settings from `src/prompt{edit}.ts`.

### `POST /generate-text` — Generate AI Text (💰 $0.001 USDC)

**Request:**
```json
{
  "prompt": "Your question or request",
  "model": "openai/gpt-4o-mini"
}
```

**Response:**
```json
{
  "success": true,
  "model": "openai/gpt-4o-mini",
  "output": "AI generated response..."
}
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Missing environment variables" | Make sure `.env` exists and has all values filled in |
| "OPENROUTER_API_KEY required" | Check your API key is correctly set in `.env` |
| "Server not responding" | Ensure `pnpm dev` is still running in the terminal |
| Changes not showing | Restart the server after editing files |

---

## 📄 Project Structure

```
x402-openrouter-starter/
├── src/
│   ├── prompt{edit}.ts   ← ✏️ EDIT THIS (customize AI)
│   ├── server.ts         ← Express server + x402 + CORS
│   └── openrouter.ts     ← AI generation logic
├── frontend/             ← 🌐 STANDALONE FRONTEND
│   ├── src/
│   │   ├── components/   ← Wallet, Tester, Payment UI
│   │   ├── App.tsx       ← Main app
│   │   └── wagmi.ts      ← Wallet config
│   ├── package.json
│   └── README.md
├── docs/
│   └── non-technical-walkthrough.md
├── .env                  ← 🔐 YOUR SECRETS (never commit!)
├── package.json
└── README.md
```

---

## 🎓 Key Concepts

| Concept | What It Does |
|---------|--------------|
| **x402** | Payment protocol that charges per API call automatically |
| **USDC** | Stablecoin (1 USDC = $1) on Base network |
| **OpenRouter** | Service that connects to multiple AI models (GPT-4, Claude, etc.) |
| **ngrok** | Makes your local server publicly accessible |
| **Base** | Ethereum L2 network with low transaction fees |

---

## 📚 Resources

- **x402 Protocol**: [x402.org](https://x402.org)
- **OpenRouter Models**: [openrouter.ai/models](https://openrouter.ai/models)
- **Base Network**: [base.org](https://base.org)
- **GitHub Codespaces**: [docs.github.com/codespaces](https://docs.github.com/en/codespaces)

---

## 📝 License

MIT

---

<p align="center">
  <b>Built with ❤️ using x402 + OpenRouter</b><br>
  <i>Start earning from your AI API today!</i>
</p>
