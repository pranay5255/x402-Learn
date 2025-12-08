# x402-openrouter-ngrok-starter

> 🚀 A beginner-friendly template for building **paid AI API endpoints** using the x402 payment protocol.

Accept USDC cryptocurrency payments on Base network and generate AI responses with OpenRouter — all in one seamless flow.

**Perfect for both technical and non-technical users! No local setup required — runs entirely in your browser via GitHub Codespaces.**

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

### 🔐 Files You CREATE in Codespace (⚠️ never commit!)

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

## 🛠️ Setup Guide (GitHub Codespaces)

**Everything runs in your browser — no local installation needed!**

### 📋 Prerequisites

Before starting, gather these credentials and keep them in a notepad:

| Item | Where to Get It |
|------|-----------------|
| GitHub account | [github.com](https://github.com) (you probably have this!) |
| Base wallet address | Any Ethereum wallet (MetaMask, Coinbase Wallet, etc.) |
| OpenRouter API key | [openrouter.ai/keys](https://openrouter.ai/keys) |

---

### Step 1: Fork the Repository

1. Click the **Fork** button at the top-right of this repository
2. This creates your own copy that you can customize

---

### Step 2: Launch GitHub Codespace

1. Go to **your forked repository**
2. Click the green **Code** button
3. Select the **Codespaces** tab
4. Click **Create codespace on main**

⏳ Wait ~30 seconds for your browser-based development environment to start.

> 💡 **What is Codespaces?** It's a complete development environment running in your browser — like having VS Code in a tab!

---

### Step 3: Create Your `.env` File

> ⚠️ **Important**: This file contains secrets. It stays in your Codespace only — never commit it!

In the Codespace file explorer (left sidebar):

1. Right-click in the file list → **New File**
2. Name it: `.env`
3. Paste the following and fill in YOUR values:

```env
# REQUIRED - Your Base or Base Sepolia wallet address
ADDRESS=0xYourWalletAddressHere

# REQUIRED - OpenRouter API key (get from openrouter.ai/keys)
OPENROUTER_API_KEY=your_openrouter_key

# REQUIRED - Choose your AI model (browse at openrouter.ai/models)
OPENROUTER_MODEL=openai/gpt-4o-mini
```

**Where to get these values:**

| Variable | How to Get It |
|----------|---------------|
| `ADDRESS` | Open MetaMask or your wallet → Copy your wallet address (starts with `0x...`) |
| `OPENROUTER_API_KEY` | Go to [openrouter.ai/keys](https://openrouter.ai/keys) → Sign up → Create new key → Copy it |
| `OPENROUTER_MODEL` | Browse [openrouter.ai/models](https://openrouter.ai/models) → Pick a model name (e.g., `openai/gpt-4o-mini`) |

4. Save the file (`Ctrl+S` or `Cmd+S`)

---

### Step 4: Install ngrok

ngrok creates a public URL so others can access your API and pay you.

In the Codespace terminal (bottom of screen), run:

```bash
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com bookworm main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok
```

✅ You should see ngrok being installed.

---

### Step 5: Install Dependencies & Start Server

In the same terminal, run:

```bash
# Install project dependencies
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

✅ Your server is running!

---

### Step 6: Start ngrok (Get Public URL)

Open a **new terminal** tab:
- Click the **+** icon in the terminal panel, or
- Press `` Ctrl+Shift+` ``

In the new terminal, run:

```bash
ngrok http 4021
```

**You'll see something like:**

```
Session Status                online
Forwarding                    https://abc-123-xyz.ngrok-free.app -> http://localhost:4021
```

📋 **Copy your public URL** (the `https://...ngrok-free.app` one)

🎉 **That's it!** This is your public API address that others can pay to use!

---

## ✏️ Customizing Your AI

The magic happens in **`src/prompt{edit}.ts`** — edit it to change your AI's personality!

### How to Edit

1. In Codespace, click `src/prompt{edit}.ts` in the file explorer
2. Edit the values in quotes
3. Save (`Ctrl+S` or `Cmd+S`)
4. Restart the server: press `Ctrl+C` in the server terminal, then run `pnpm dev` again

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
