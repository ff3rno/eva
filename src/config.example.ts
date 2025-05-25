// This is an example configuration file.
// To use your own configuration:
// 1. Rename this file to `config.ts` (i.e., `cp src/config.example.ts src/config.ts`).
// 2. Replace the placeholder values below with your actual API keys.
//
// Alternatively, you can set these values using environment variables:
// - TELEGRAM_API_TOKEN: Your Telegram Bot API token.
// - OPENAI_API_KEY: Your OpenAI API key.
// - OPENAI_MODEL: The OpenAI model you wish to use (e.g., 'gpt-3.5-turbo', 'gpt-4').
//
// If environment variables are set, they will take precedence over values defined in `src/config.ts`.

// Telegram Bot API Token
export const telegramApiToken: string | undefined = 'YOUR_TELEGRAM_API_TOKEN_HERE';

// OpenAI API Key
export const openaiApiKey: string | undefined = 'YOUR_OPENAI_API_KEY_HERE';

// Default OpenAI Model
// You can change this to any model compatible with the OpenAI Chat API, e.g., 'gpt-4', 'gpt-3.5-turbo-16k'.
// The application will use the OPENAI_MODEL environment variable if set, otherwise it defaults to this value.
export const defaultOpenAIModel: string = 'gpt-4o-mini';

// Note: The actual configuration is loaded from src/config.ts.
// If src/config.ts is not found, or if specific values are undefined there,
// the application will rely on environment variables.
// The checks for missing keys are primarily in src/index.ts and src/config.ts.
