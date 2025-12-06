# x402-openrouter-starter

A beginner-friendly template for building paid AI API endpoints using x402 payment protocol. Accept USDC cryptocurrency payments on Base network and generate AI responses with OpenRouter.

**Perfect for both technical and non-technical users!**

---

## 🎯 What This Does

- Creates a paid AI API that charges **$0.001 USDC** per request
- Payments are processed automatically via x402 protocol
- You receive payments directly to your Base (or Base Sepolia for testing) wallet
- AI responses powered by your choice of models via OpenRouter
- **Includes a frontend** for testing any x402 endpoint with wallet payments

---

## 🌐 Frontend Tester

This repo includes a standalone frontend (`/frontend`) that lets you:
- **Test any x402 endpoint** - Paste any ngrok URL
- **Connect your wallet** - Coinbase Wallet, MetaMask, WalletConnect
- **Make paid requests** - Complete x402 payment flow in browser
- **Pay other users** - Test endpoints created by others on Base Sepolia

### Deploy the Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Or deploy to Vercel/Netlify for a hosted version. See `/frontend/README.md` for details.

---

## 📁 Understanding the Files

### ✏️ Files You EDIT on GitHub (can be committed)

| File | Purpose |
|------|---------|
| `src/prompt{edit}.ts` | **Your main editing file!** Customize AI personality, prompts, and settings |
| `README.md` | This documentation |

### 🔐 Files You CREATE LOCALLY (never commit!)

| File | Purpose |
|------|---------|
| `.env` | Your secret API keys and wallet address |

### 📦 Files You DON'T Touch

| File | Purpose |
|------|---------|
| `src/server.ts` | Express server with x402 payment middleware |
| `src/openrouter.ts` | OpenRouter API integration |
| `package.json` | Project dependencies |

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Get Your API Keys

Before you start, you'll need:

1. **Base or Base Sepolia Wallet Address** - Where payments settle
2. **OpenRouter API Key** - From [openrouter.ai/keys](https://openrouter.ai/keys)
3. *(Optional for mainnet)* **CDP API Keys** - From [Coinbase Developer Platform](https://docs.cdp.coinbase.com/)

### Step 2: Fork & Clone the Repository

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/x402-openrouter-starter.git
cd x402-openrouter-starter
```

### Step 3: Create Your `.env` File (LOCAL ONLY - Never Commit!)

Create the file and paste the values:

```env
# REQUIRED - Your Base or Base Sepolia wallet address
ADDRESS=0xYourWalletAddressHere

# REQUIRED - OpenRouter API key
OPENROUTER_API_KEY=your_openrouter_key

# OPTIONAL - Choose your AI model
OPENROUTER_MODEL=openai/gpt-4o-mini

# OPTIONAL - Use mainnet facilitator (requires CDP keys)
# X402_ENV=mainnet
# CDP_API_KEY_ID=your_cdp_key_id
# CDP_API_KEY_SECRET=your_cdp_key_secret

# OPTIONAL - Override facilitator URL (defaults to https://x402.org/facilitator for testnet)
# FACILITATOR_URL=https://x402.org/facilitator
```

### Step 4: Install & Run

```bash
# Install dependencies
pnpm install

# Start the server
pnpm dev
```

You should see:
```
╔═══════════════════════════════════════════════════════════════╗
║           🚀 x402 OpenRouter Server Started!                  ║
╚═══════════════════════════════════════════════════════════════╝
```

### Step 5: Expose with ngrok (to receive payments)

Open a new terminal:

```bash
# If ngrok is installed
ngrok http 4021

# Or use the script
pnpm ngrok
```

Copy your public URL (like `https://abc123.ngrok-free.app`)

---

## ✏️ Customizing Your AI (via GitHub UI)

The magic file is **`src/prompt{edit}.ts`** - edit it directly on GitHub!

### How to Edit on GitHub:

1. Go to `src/prompt{edit}.ts` in your repo
2. Click the **pencil icon** (✏️) to edit
3. Modify the prompts
4. Click **"Commit changes"**
5. Restart your server to see changes

### What You Can Customize:

```typescript
// 🤖 SYSTEM PROMPT - Your AI's personality
export const SYSTEM_PROMPT = `You are a helpful, friendly AI assistant.
You provide clear, concise, and accurate responses.`;

// 💬 DEFAULT PROMPT - Fallback when no prompt given
export const DEFAULT_USER_PROMPT = `Say hello!`;

// 📝 EXAMPLE PROMPTS - Show users what to try
export const EXAMPLE_PROMPTS = [
  "Write a haiku about crypto",
  "Explain blockchain simply",
];

// ⚙️ MODEL OVERRIDE - Use a specific model
export const MODEL_OVERRIDE = ""; // or "anthropic/claude-3-haiku"

// 🎯 GENERATION SETTINGS
export const GENERATION_SETTINGS = {
  temperature: 0.7,  // 0 = focused, 1 = creative
  max_tokens: 1000,  // Response length limit
};
```

---

## 🧪 Testing Your API

### Option 1: Use the Frontend Tester (Recommended!)

The easiest way to test your API with real payments:

1. **Start your backend** with ngrok:
   ```bash
   # Terminal 1: Start server
   pnpm dev
   
   # Terminal 2: Expose with ngrok
   ngrok http 4021
   ```

2. **Start the frontend**:
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

3. **Open the frontend** at `http://localhost:5173`

4. **Connect your wallet** (Coinbase Wallet, MetaMask, or WalletConnect)

5. **Paste your ngrok URL** into the endpoint field

6. Click **"Make Paid Request"** - the frontend will:
   - Detect the 402 Payment Required response
   - Show you the payment details
   - Let you sign and send the payment
   - Display the AI response

### Option 2: Test Free Endpoints (no payment needed)

```bash
# Check server status
curl http://localhost:4021/

# View current prompt configuration
curl http://localhost:4021/config
```

### Option 3: Test via CLI with curl

```bash
# 1) Get the 402 paywall (no X-PAYMENT header yet)
curl -i -X POST https://YOUR-NGROK-OR-LOCAL-URL/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about coding"}'

# 2) Use an x402-capable buyer client to pay and produce X-PAYMENT
# See Coinbase buyer quickstart for how to construct the header:
# https://docs.cdp.coinbase.com/x402/quickstart-for-buyers
# Then re-run:
# curl -X POST https://YOUR-NGROK-OR-LOCAL-URL/generate-text \
#   -H "Content-Type: application/json" \
#   -H "X-PAYMENT: <payment-payload-from-buyer-client>" \
#   -d '{"prompt": "Write a haiku about coding"}'
```

---

## 🌐 Browser-Only Setup (GitHub Codespaces)

No local IDE? No problem!

1. **Open Web Editor**: Go to your repo, press `.` (period key)
2. **Create Codespace**: Click `Code → Codespaces → Create codespace`
3. **In Codespace Terminal**:
   ```bash
   # Create .env file
   cp .env.example .env
   # Edit .env with your keys (use the editor)
   
   # Install and run
   pnpm install
   pnpm dev
   ```
4. **Start ngrok** in another terminal: `ngrok http 4021`
5. **Edit prompts**: Modify `src/prompt{edit}.ts` and commit!

---

## 📊 API Reference

### `GET /` - Server Info (Free)

Returns server status and available endpoints.

### `GET /config` - View Configuration (Free)

Returns current prompt settings from `src/prompt{edit}.ts`.

### `POST /generate-text` - Generate AI Text ($0.001 USDC)

**Request:**
```json
{
  "prompt": "Your question or request",
  "model": "openai/gpt-4o-mini"  // optional
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

## 🔧 Troubleshooting

### "Missing required environment variables"
- Make sure you created `.env` (not just `.env.example`)
- Check all required variables are filled in

### "OPENROUTER_API_KEY is required"
- Add your OpenRouter API key to `.env`
- Get one at [openrouter.ai/keys](https://openrouter.ai/keys)

### "401 from OpenRouter"
- Check your API key is correct
- Some keys need `OPENROUTER_HTTP_REFERER` header

### "x402 payment not detected"
- Ensure you're using an x402-capable client
- Confirm ngrok URL matches your request
- Verify wallet address is correct in `.env`

---

## 📚 Learn More

- **x402 Protocol**: [x402.org](https://x402.org)
- **OpenRouter Models**: [openrouter.ai/models](https://openrouter.ai/models)
- **Coinbase Developer Platform**: [docs.cdp.coinbase.com](https://docs.cdp.coinbase.com)
- **Non-Technical Walkthrough**: See `docs/non-technical-walkthrough.md`

---

## 📄 Project Structure

```
x402-openrouter-starter/
├── src/
│   ├── prompt{edit}.ts   ← ✏️ EDIT THIS ON GITHUB
│   ├── server.ts         ← Express server + x402
│   └── openrouter.ts     ← AI generation logic
├── docs/
│   └── non-technical-walkthrough.md
├── .env                  ← 🔐 YOUR SECRETS (create locally, never commit!)
├── package.json
└── README.md
```

---

## 🤝 Sharing & Paying Other Users

The beauty of x402 is that **anyone can test and pay for anyone else's API**:

### Share Your Endpoint

1. Deploy your backend with your custom prompts
2. Run ngrok to get a public URL
3. Share your ngrok URL with others

### Test Someone Else's Endpoint

1. Get testnet ETH from [Coinbase Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet)
2. Open the frontend tester
3. Connect your wallet
4. Paste their ngrok URL
5. Make paid requests - your USDC goes to their wallet!

### How Payments Flow

```
Your Wallet (Base Sepolia)
        │
        │ $0.001 USDC
        ▼
x402 Facilitator (x402.org)
        │
        │ Verified payment
        ▼
API Provider's Wallet
```

---

## 📄 Project Structure

```
x402-openrouter-starter/
├── src/
│   ├── prompt{edit}.ts   ← ✏️ EDIT THIS ON GITHUB
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
├── .env                  ← 🔐 YOUR SECRETS (create locally, never commit!)
├── package.json
└── README.md
```

---

## 📝 License

MIT
