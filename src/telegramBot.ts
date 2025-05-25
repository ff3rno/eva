import TelegramBot from 'node-telegram-bot-api';
import { telegramApiToken } from './config';

// Create a new TelegramBot instance
const bot = new TelegramBot(telegramApiToken, { polling: true });

// Basic message handler
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText) {
    console.log(`Received message from ${chatId}: ${messageText}`);
    bot.sendMessage(chatId, `You said: ${messageText}`);
  }
});

// Error handler for polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Export the bot instance
export { bot };

// Optional: A function to explicitly start the bot
export const startTelegramBot = () => {
  console.log('Telegram bot started and polling...');
  // The bot starts polling when it's instantiated with { polling: true }
  // This function can be used as an explicit entry point if desired.
};
