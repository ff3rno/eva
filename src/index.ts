import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { initializeBot } from './telegramBot'; // Import the initialization function
import { getOpenAIResponse } from './openAIProxy';
import { telegramApiToken, openaiApiKey } from './config';

// Check for essential API keys
// These checks will now use values potentially sourced from .env via src/config.ts
if (!telegramApiToken || telegramApiToken === 'YOUR_TELEGRAM_BOT_TOKEN') {
  console.error('Error: Telegram API token is not configured. Please set it in src/config.ts or environment variables.');
  process.exit(1);
}

if (!openaiApiKey || openaiApiKey === 'YOUR_OPENAI_API_KEY') {
  console.error('Error: OpenAI API key is not configured. Please set it in src/config.ts or environment variables.');
  process.exit(1);
}

// Initialize the bot
const bot = initializeBot(telegramApiToken as string);

// Modify the bot's message handler
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Ignore messages without text
  if (!userMessage) {
    return;
  }

  console.log(`Received message from chat ID ${chatId}: "${userMessage}"`);

  try {
    const openAIResponse = await getOpenAIResponse(userMessage);

    if (openAIResponse) {
      bot.sendMessage(chatId, openAIResponse);
      console.log(`Sent OpenAI response to chat ID ${chatId}: "${openAIResponse}"`);
    } else {
      bot.sendMessage(chatId, "Sorry, I couldn't process your request right now. Please try again later.");
      console.log(`Sent error message to chat ID ${chatId} due to null response from OpenAI.`);
    }
  } catch (error) {
    console.error(`Error processing message for chat ID ${chatId}:`, error);
    try {
      bot.sendMessage(chatId, "Sorry, an unexpected error occurred. We are looking into it.");
    } catch (sendError) {
      console.error(`Failed to send error message to chat ID ${chatId}:`, sendError);
    }
  }
});

// Startup message
console.log('Telegram bot started and listening for messages...');

// Optional: If you have an explicit start function in telegramBot.ts and prefer to call it:
// import { startTelegramBot } from './telegramBot';
// startTelegramBot();

// Keep the process alive (if not using polling:true, which already does this)
// process.stdin.resume(); // Not strictly necessary with polling:true
// Or handle SIGINT/SIGTERM for graceful shutdown
// function handleShutdown(signal: string) {
//   console.log(`Received ${signal}. Shutting down gracefully...`);
//   bot.stopPolling().then(() => {
//     console.log('Telegram bot stopped.');
//     process.exit(0);
//   });
// }
// process.on('SIGINT', () => handleShutdown('SIGINT'));
// process.on('SIGTERM', () => handleShutdown('SIGTERM'));
