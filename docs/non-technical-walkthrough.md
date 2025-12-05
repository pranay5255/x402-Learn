# x402 + OpenRouter: No-IDE Walkthrough

Use this as a lightweight slide deck. Each `---` is a slide break.

View on GitHub and print to PDF, or run: `npx -y md-to-pdf docs/non-technical-walkthrough.md`

---

## 🎯 Goal: What We're Building

- A paid AI API that earns you **$0.01 USDC** per request
- No complex setup - works entirely from your browser!
- Customize your AI by editing just ONE file on GitHub

---

## 📋 What You Need Before Starting

| Item | Where to Get It |
|------|-----------------|
| GitHub account | [github.com](https://github.com) |
| Base wallet address | Any Ethereum wallet (MetaMask, Coinbase Wallet) |
| CDP API keys | [docs.cdp.coinbase.com](https://docs.cdp.coinbase.com) |
| OpenRouter API key | [openrouter.ai/keys](https://openrouter.ai/keys) |

💡 **Tip**: Keep these in a notepad - you'll paste them later!

---

## 📁 Files Explained Simply

### ✏️ Files YOU Edit (on GitHub)

| File | What It Does |
|------|--------------|
| `src/prompt{edit}.ts` | Customize your AI's personality & responses |

### 🔐 Files You Create (keep secret!)

| File | What It Does |
|------|--------------|
| `.env` | Your secret keys (never share!) |

### 📦 Files That Just Work (don't touch)

Everything else handles the server and payments automatically.

---

## Step 1: Open GitHub's Web Editor

1. Go to your repository on GitHub
2. Press the **`.`** key (period) on your keyboard
3. GitHub opens a code editor in your browser! ✨

No downloads. No installation. Just edit!

---

## Step 2: Create Your Secret `.env` File

In the web editor:

1. Right-click the file list → **New File**
2. Name it: `.env`
3. Paste this template and fill in YOUR values:

```
ADDRESS=0xYourWalletAddress
CDP_API_KEY_ID=your_cdp_key
CDP_API_KEY_SECRET=your_cdp_secret
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

⚠️ **Important**: This file stays in your Codespace only!

---

## Step 3: Launch a Codespace (Browser Dev Environment)

1. Go back to your repository's main page
2. Click the green **Code** button
3. Select **Codespaces** tab
4. Click **Create codespace on main**

Wait ~30 seconds for your browser-based computer to start! 🖥️

---

## Step 4: Install & Run the Server

In the Codespace terminal (bottom of screen), type:

```bash
pnpm install
pnpm dev
```

You'll see:
```
🚀 x402 OpenRouter Server Started!
Server URL: http://0.0.0.0:4021
```

✅ Your server is running!

---

## Step 5: Get a Public URL with ngrok

Open a **new terminal tab** (click the + icon) and run:

```bash
ngrok http 4021
```

Copy the URL that looks like:
```
https://abc-123-xyz.ngrok-free.app
```

This is your PUBLIC API address! 🌐

---

## Step 6: Test Your API (Free Endpoints)

Open a browser tab and visit:

```
https://YOUR-NGROK-URL/
```

You should see a JSON response with your server status!

Try also:
```
https://YOUR-NGROK-URL/config
```

This shows your current AI settings! ⚙️

---

## ✏️ Customizing Your AI

The fun part! Edit `src/prompt{edit}.ts` to change your AI.

### How to Edit:

1. Find `src/prompt{edit}.ts` in the file list
2. Click to open it
3. Edit the text in quotes
4. Save (Ctrl+S or Cmd+S)
5. Restart server: stop it (Ctrl+C) and run `pnpm dev` again

---

## 🎨 What You Can Customize

### System Prompt (AI's Personality)

```typescript
export const SYSTEM_PROMPT = `You are a friendly pirate AI!
You speak in pirate slang and love to say "Arrr!"
Help users with their questions, matey!`;
```

### Default Response

```typescript
export const DEFAULT_USER_PROMPT = `Ahoy! What treasure can I help ye find today?`;
```

### Example Prompts

```typescript
export const EXAMPLE_PROMPTS = [
  "Tell me a pirate joke!",
  "What's the best crypto treasure?",
];
```

---

## 🔧 Advanced Settings

### Change the AI Model

```typescript
export const MODEL_OVERRIDE = "anthropic/claude-3-haiku";
```

Browse models at [openrouter.ai/models](https://openrouter.ai/models)

### Adjust Creativity

```typescript
export const GENERATION_SETTINGS = {
  temperature: 0.9,  // Higher = more creative
  max_tokens: 500,   // Shorter responses
};
```

---

## 🚨 Troubleshooting

### "Missing environment variables"
→ Make sure `.env` exists and has all values filled in

### "OPENROUTER_API_KEY required"
→ Check your API key is in `.env`

### "Server not responding"
→ Make sure `pnpm dev` is still running in the terminal

### Changes not showing
→ Restart the server after editing files

---

## 💰 Getting Paid

When someone calls your `POST /generate-text` endpoint:

1. x402 middleware checks for payment ($0.01 USDC)
2. Payment goes directly to YOUR wallet address
3. AI generates and returns the response
4. User gets their answer, you get paid!

All automatic! 🎉

---

## 🎓 Key Concepts Learned

| Concept | What You Did |
|---------|--------------|
| x402 | Payment protocol that charges per API call |
| USDC | Stablecoin (1 USDC = $1) on Base network |
| OpenRouter | Service that connects to multiple AI models |
| ngrok | Makes your local server publicly accessible |
| Codespaces | GitHub's browser-based development environment |

---

## 🚀 Next Steps

1. **Experiment**: Try different system prompts!
2. **Share**: Give friends your ngrok URL to test
3. **Learn**: Explore different OpenRouter models
4. **Build**: Create your own unique AI service!

---

## 📚 Resources

- **x402 Protocol**: [x402.org](https://x402.org)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)
- **Base Network**: [base.org](https://base.org)
- **GitHub Codespaces**: [docs.github.com/codespaces](https://docs.github.com/en/codespaces)

---

## ❓ Need Help?

- Check the main `README.md` for detailed instructions
- Visit the repository's Issues page
- Ask in the x402 community

**You did it!** 🎉

You built a paid AI API entirely from your browser!
