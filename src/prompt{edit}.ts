/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     🎨 YOUR CUSTOM PROMPT CONFIGURATION                    ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  This file is designed to be edited directly on GitHub!                   ║
 * ║                                                                           ║
 * ║  HOW TO EDIT:                                                             ║
 * ║  1. Click the pencil icon (✏️) on GitHub to edit this file               ║
 * ║  2. Modify the prompts below to customize your AI's behavior              ║
 * ║  3. Click "Commit changes" to save                                        ║
 * ║                                                                           ║
 * ║  The server will use these prompts when generating responses!             ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ============================================================================
// 🤖 SYSTEM PROMPT - Defines your AI's personality and behavior
// ============================================================================
/**
 * WHAT IT DOES:
 *   This is the "instruction set" that shapes how the AI responds to every query.
 *   It's sent as a hidden context before every user message.
 *
 * HOW TO EDIT:
 *   - Change the personality (e.g., "You are a friendly..." → "You are a formal...")
 *   - Modify expertise areas (e.g., add/remove domains)
 *   - Adjust response style (e.g., "Be concise" vs "Be detailed")
 *
 * EXAMPLES:
 *   - Customer support bot: "You are a helpful customer service agent..."
 *   - Code reviewer: "You are a senior software engineer who reviews code..."
 *   - Creative writer: "You are a creative fiction writer with a witty style..."
 */
export const SYSTEM_PROMPT = `You are a sophisticated AI agent specializing in blockchain technology, cryptocurrency, and decentralized finance. Your primary purpose is to serve as an expert consultant and assistant for users seeking guidance on Web3 technologies, smart contracts, token economics, and blockchain infrastructure.
Your mission is to democratize access to blockchain expertise and empower users to navigate the complex world of decentralized technologies with confidence and understanding.`;

// ============================================================================
// 🧠 AGENT PROFILE - Human-friendly description shown in /config
// ============================================================================
/**
 * WHAT IT DOES:
 *   Describes your agent to users who visit the /config endpoint.
 *   This is public-facing info that helps users understand what your agent does.
 *
 * HOW TO EDIT:
 *   - name: Short, memorable name for your agent (1-4 words)
 *   - tagline: One-liner that captures what your agent does (under 80 chars)
 *   - mission: 1-2 sentences explaining the agent's purpose
 *   - focusAreas: Array of 3-6 bullet points listing expertise areas
 *   - idealUsers: Array of 2-4 descriptions of who benefits most
 *   - pricingNote: Brief explanation of the cost to use the API
 *
 * EXAMPLES:
 *   - name: "Code Buddy", "Legal Advisor", "Recipe Master"
 *   - tagline: "Your AI pair programmer for React", "Contract review in minutes"
 */
export const AGENT_PROFILE = {
  name: "Onchain AI Consultant",
  tagline: "Expert guidance on Web3, Base, and x402-powered payments.",
  mission:
    "Provide clear, actionable advice on blockchain development, token economics, and secure payment integrations.",
  focusAreas: [
    "Base network design patterns",
    "x402 payment flows and monetized APIs",
    "Smart contract security and audits",
    "DeFi architecture and tokenomics",
  ],
  idealUsers: [
    "Developers integrating crypto payments",
    "Founders validating Web3 product ideas",
    "Security-conscious teams shipping on Base",
  ],
  pricingNote: "API calls cost $0.001 USDC via Base/Base-Sepolia using x402.",
};

// ============================================================================
// 💬 DEFAULT USER PROMPT - Used when no prompt is provided in the request
// ============================================================================
/**
 * WHAT IT DOES:
 *   This prompt is used as a fallback when someone calls the API without
 *   specifying their own prompt. It's like the "demo mode" response.
 *
 * HOW TO EDIT:
 *   - Write what you want the agent to say when first introduced
 *   - Include key capabilities you want highlighted
 *   - Keep it under 500 characters for best results
 *
 * TIPS:
 *   - Start with "Introduce yourself..." for a natural greeting
 *   - Mention 3-5 key capabilities
 *   - Reference the payment system if relevant
 */
export const DEFAULT_USER_PROMPT = `Introduce yourself as a blockchain and cryptocurrency expert AI consultant. Explain your specialized knowledge areas including blockchain fundamentals, DeFi ecosystems, smart contracts, token economics, x402 payment protocol, Base network expertise, and cryptocurrency payment systems. Briefly describe how you can help users navigate Web3 technologies and mention that you operate through a paid API service using USDC payments on the Base network.`;

// ============================================================================
// 📝 PROMPT EXAMPLES - Sample prompts users can try
// ============================================================================
/**
 * WHAT IT DOES:
 *   These example prompts appear in the API documentation and help page.
 *   They show users what kinds of questions they can ask.
 *
 * HOW TO EDIT:
 *   - Add/remove/modify examples as needed
 *   - Keep each prompt to 1-2 sentences
 *   - Show variety in what the agent can do
 *   - Put your best examples first
 *
 * TIPS:
 *   - Include simple and advanced examples
 *   - Cover different aspects of your agent's expertise
 *   - Use action verbs: "Explain...", "Compare...", "Create...", "Analyze..."
 */
export const EXAMPLE_PROMPTS = [
  "Explain how the x402 payment protocol works and its benefits for API monetization",
  "Compare Ethereum mainnet with Base network in terms of transaction costs and speed",
  "What are the key security considerations when developing smart contracts?",
  "Describe the tokenomics of a successful DeFi protocol and what makes it sustainable",
  "How does decentralized lending work and what are the risks involved?",
  "Explain Layer 2 scaling solutions and their impact on Ethereum's ecosystem",
  "What are the best practices for integrating cryptocurrency payments into web applications?",
  "Compare different consensus mechanisms: Proof of Work vs Proof of Stake vs others",
  "How can someone safely store and manage their cryptocurrency assets?",
  "What are the regulatory considerations for blockchain projects in different jurisdictions?",
];

// ============================================================================
// 📌 GUIDED USAGE EXAMPLES - Shown in /config to help users
// ============================================================================
/**
 * WHAT IT DOES:
 *   These are detailed use-case examples shown in the /config endpoint.
 *   They help users understand what they'll get from each type of request.
 *
 * HOW TO EDIT:
 *   Each example has three parts:
 *   - title: Short name for this use case (3-8 words)
 *   - prompt: The actual prompt the user would send (1-2 sentences)
 *   - outcome: What the agent will deliver (1-2 sentences)
 *
 * TIPS:
 *   - Include 2-5 examples covering your main use cases
 *   - Make outcomes specific and tangible
 *   - Show the value users get from paying for the API
 */
export const AGENT_EXAMPLES = [
  {
    title: "Design a paid API on Base with x402",
    prompt: "Outline a minimal x402 paid API on Base: pricing, wallets, facilitator setup.",
    outcome: "Step-by-step env vars, endpoint shape, and a simple payment flow diagram.",
  },
  {
    title: "Secure a DeFi smart contract",
    prompt: "Review a lending protocol design for security risks and propose mitigations.",
    outcome: "Risk checklist, recommended patterns, and the test cases to add.",
  },
  {
    title: "Compare Base vs Ethereum for launch",
    prompt: "Compare launching on Base vs Ethereum mainnet with costs, tooling, and UX tradeoffs.",
    outcome: "Deployment recommendation with estimated fees and a migration plan.",
  },
];

// ============================================================================
// ⚙️ MODEL OVERRIDE - Choose which AI model to use
// ============================================================================
/**
 * WHAT IT DOES:
 *   Lets you override the AI model used for generation.
 *   Leave empty ("") to use the model from your .env file.
 *
 * HOW TO EDIT:
 *   - Set to "" (empty string) to use the .env MODEL setting
 *   - Set to a valid OpenRouter model ID to override
 *
 * AVAILABLE MODELS (browse more at https://openrouter.ai/models):
 *   - "openai/gpt-4o-mini"       → Fast, affordable, good quality
 *   - "openai/gpt-4o"            → Highest quality, more expensive
 *   - "anthropic/claude-3-haiku" → Fast, great for simple tasks
 *   - "anthropic/claude-3-opus"  → Best reasoning, most expensive
 *   - "google/gemini-pro"        → Good balance of speed and quality
 *   - "meta-llama/llama-3-70b"   → Open source, good performance
 */
export const MODEL_OVERRIDE = "";

// ============================================================================
// 🎯 GENERATION SETTINGS - Fine-tune AI response behavior
// ============================================================================
/**
 * WHAT IT DOES:
 *   Controls how the AI generates responses.
 *
 * HOW TO EDIT:
 *   - temperature: Controls randomness/creativity
 *       0.0 = Very deterministic (same input → same output)
 *       0.7 = Balanced (default, good for most uses)
 *       1.0 = Creative (more varied responses)
 *       1.5+ = Very random (experimental, may be incoherent)
 *
 *   - max_tokens: Maximum length of response
 *       500  = Short responses (1-2 paragraphs)
 *       2000 = Medium responses (good for explanations)
 *       4000 = Long responses (detailed analysis)
 *       8000 = Very long (full documents/reports)
 *
 * TIPS:
 *   - Lower temperature for factual/technical content
 *   - Higher temperature for creative/brainstorming tasks
 *   - Higher max_tokens costs more but allows complete answers
 */
export const GENERATION_SETTINGS = {
  temperature: 0.7,
  max_tokens: 4000,
};
