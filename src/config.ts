// Configures the application by primarily reading from environment variables.
// Environment variables can be populated by a .env file (loaded by dotenv in index.ts)
// or set directly in the deployment environment.

export const telegramApiToken: string | undefined = process.env.TELEGRAM_API_TOKEN || undefined;
export const openaiApiKey: string | undefined = process.env.OPENAI_API_KEY || undefined;
export const defaultOpenAIModel: string = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// Optional: Add a check to log if keys are missing, though index.ts already does this.
// Avoid logging these warnings if NODE_ENV is 'test' (useful for testing environments)
if (process.env.NODE_ENV !== 'test') {
  if (!telegramApiToken) {
    console.warn('Telegram API token is not set. Please ensure TELEGRAM_API_TOKEN is defined in your .env file or environment variables.');
  }
  if (!openaiApiKey) {
    console.warn('OpenAI API key is not set. Please ensure OPENAI_API_KEY is defined in your .env file or environment variables.');
  }
}
