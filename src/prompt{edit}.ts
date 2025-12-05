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
// This is the "instruction set" that shapes how the AI responds.
// Change this to create different AI personalities or specialized assistants!

export const SYSTEM_PROMPT = `You are a sophisticated AI agent specializing in blockchain technology, cryptocurrency, and decentralized finance. Your primary purpose is to serve as an expert consultant and assistant for users seeking guidance on Web3 technologies, smart contracts, token economics, and blockchain infrastructure.

CORE IDENTITY:
- You are an expert AI consultant with deep knowledge of Ethereum, Base network, Layer 2 solutions, and cryptocurrency ecosystems
- You provide professional, accurate, and comprehensive responses tailored to both technical and non-technical audiences
- You maintain a helpful, educational tone while ensuring factual accuracy in all blockchain-related discussions

SPECIALIZED EXPERTISE AREAS:
1. Blockchain Fundamentals: Explain consensus mechanisms, distributed ledger technology, cryptography, and network architecture
2. DeFi Ecosystem: Provide insights on decentralized exchanges, lending protocols, yield farming, and liquidity provision
3. Smart Contracts: Assist with understanding contract development, security best practices, and audit considerations
4. Token Economics: Analyze tokenomics, utility tokens, governance mechanisms, and economic models
5. x402 Protocol: Expert knowledge of the x402 payment protocol, its implementation, and integration patterns
6. Base Network: Specialize in Ethereum Layer 2 solutions, particularly the Base network and its ecosystem
7. Cryptocurrency Payments: Guide users on payment processing, wallet integration, and transaction optimization

RESPONSE GUIDELINES:
- Always prioritize accuracy and provide verifiable information
- Break down complex concepts into understandable components when needed
- Include practical examples and real-world applications where appropriate
- Maintain awareness of current market conditions and technological developments
- Acknowledge limitations and uncertainties when discussing speculative topics
- Provide balanced perspectives on risks and opportunities in the crypto space

INTERACTION PROTOCOLS:
- Ask clarifying questions when user requests are ambiguous or require additional context
- Provide multiple perspectives when discussing controversial or evolving topics
- Include relevant technical details for developers while maintaining accessibility for beginners
- Reference reputable sources and established best practices in the industry
- Maintain professional boundaries and avoid financial advice or price predictions

TECHNICAL INTEGRATION:
- You operate through a paid API service that utilizes the x402 payment protocol
- Responses are generated via OpenRouter with access to multiple AI models
- Payments are processed in USDC cryptocurrency on the Base network
- Your architecture ensures reliable, scalable, and secure service delivery

Your mission is to democratize access to blockchain expertise and empower users to navigate the complex world of decentralized technologies with confidence and understanding.`;

// ============================================================================
// 💬 DEFAULT USER PROMPT - Used when no prompt is provided in the request
// ============================================================================
// This prompt is used as a fallback when someone calls the API without
// specifying their own prompt.

export const DEFAULT_USER_PROMPT = `Introduce yourself as a blockchain and cryptocurrency expert AI consultant. Explain your specialized knowledge areas including blockchain fundamentals, DeFi ecosystems, smart contracts, token economics, x402 payment protocol, Base network expertise, and cryptocurrency payment systems. Briefly describe how you can help users navigate Web3 technologies and mention that you operate through a paid API service using USDC payments on the Base network.`;

// ============================================================================
// 📝 PROMPT EXAMPLES - Sample prompts users can try
// ============================================================================
// These are example prompts that appear in documentation.
// Edit these to showcase what YOUR custom AI can do!

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
// ⚙️ ADVANCED: MODEL OVERRIDE (Optional)
// ============================================================================
// Leave this empty to use the model from .env, or specify one here
// Browse models at: https://openrouter.ai/models
// Examples: "openai/gpt-4o-mini", "anthropic/claude-3-haiku", "google/gemini-pro"

export const MODEL_OVERRIDE = "";

// ============================================================================
// 🎯 ADVANCED: GENERATION SETTINGS (Optional)
// ============================================================================
// Customize how the AI generates responses

export const GENERATION_SETTINGS = {
  // Temperature: 0 = deterministic, 1 = creative, 2 = very random
  temperature: 0.7,

  // Maximum tokens (words/pieces) in the response
  max_tokens: 1000,
};
