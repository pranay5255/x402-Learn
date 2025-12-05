# x402 + OpenRouter paid endpoint (no-IDE walkthrough)

Use this as a lightweight slide deck. Each `---` is a slide break. View it on GitHub and print to PDF, or run `npx -y md-to-pdf docs/non-technical-walkthrough.md`.

---
## Goal (what we're doing)
- Spin up the paid `/generate-text` API using only a browser.
- Collect $0.01 USDC on Base for each request.
- Let non-developers edit config/code on GitHub without a local IDE.

---
## What you need
- GitHub account with repo access.
- Coinbase Developer Platform (CDP) API key (ID + Secret).
- Base wallet address to receive USDC.
- OpenRouter API key.
- Optional: ngrok account (free tier works) for a public URL.

---
## Files you will touch (in GitHub)
- `.env` (create it) → paste your ADDRESS, CDP keys, OpenRouter key.
- `src/openrouter.ts` (only if changing model defaults/headers).
- `src/server.ts` (only if changing route or price).
- `README.md` (reference quick commands).

---
## Step 1: Open the repo in GitHub’s editor
- Go to the repo in your browser.
- Press `.` (period) to open the web editor, or click **Code → Open with Web Editor**.
- You can edit files and commit without installing anything locally.

---
## Step 2: Create and fill `.env`
1) In the web editor, add a new file named `.env`.  
2) Copy from `.env.example` and fill:
   - `ADDRESS=0x...` (Base wallet to receive USDC)
   - `CDP_API_KEY_ID=...`
   - `CDP_API_KEY_SECRET=...`
   - `OPENROUTER_API_KEY=...`
3) Commit the file to your branch (or save it as an untracked change inside Codespaces if you prefer not to commit secrets).

---
## Step 3: Start a Codespace (browser-only dev VM)
- In GitHub, click **Code → Codespaces → Create codespace**.
- A VS Code window opens in your browser with a terminal.
- The repo files (including `.env` if committed) are available inside the codespace.

---
## Step 4: Install and run
In the codespace terminal:
```bash
pnpm install
pnpm dev
```
- The server starts on `http://0.0.0.0:4021`.
- Keep this terminal running.

---
## Step 5: Get a public URL with ngrok
Open a new terminal tab in Codespaces:
```bash
ngrok http 4021
```
- Copy the generated `https://...ngrok-free.app` URL.
- This forwards internet traffic to your running server.

---
## Step 6: Send a paid request
- Use an x402-capable client or tool to `POST` to:  
  `https://<your-ngrok-url>/generate-text`
- Body example: `{"prompt": "Hello from the web-only setup!"}`
- Price is enforced at $0.01 USDC on Base; payment must clear for the call to reach OpenRouter.

---
## Step 7: Edit code from the browser
- For small tweaks, stay in the GitHub web editor (press `.` anytime).
- For deeper changes, edit in Codespaces (with intellisense) and commit.
- Push changes; redeploy/restart `pnpm dev` if the server is running.

---
## Troubleshooting fast paths
- 401/403 from OpenRouter → check `OPENROUTER_API_KEY`, and whether your key needs `OPENROUTER_HTTP_REFERER`/`OPENROUTER_X_TITLE`.
- x402 payment not detected → confirm ngrok URL matches your request, wallet address is on Base, and facilitator keys are correct.
- Port conflicts → set `PORT=4021` (or another) in `.env` and run `pnpm dev` again; use the same port in `ngrok http <port>`.

---
## Export to PDF
- In GitHub: open this file → browser print dialog → “Save as PDF”.
- Or in Codespaces/local: `npx -y md-to-pdf docs/non-technical-walkthrough.md`.
