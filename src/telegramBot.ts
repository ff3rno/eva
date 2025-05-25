import TelegramBot from 'node-telegram-bot-api';

export function initializeBot(token: string): TelegramBot {
  if (!token) {
    // This check is more for robustness within the function,
    // index.ts should already prevent this.
    throw new Error('Telegram bot token cannot be empty or undefined.');
  }
  const bot = new TelegramBot(token, { polling: true });

  // Moved polling_error handler here
  bot.on('polling_error', (error) => {
    console.error('Polling error from telegramBot.ts:', error);
  });

  // The basic 'message' handler that echoes messages is removed.
  // The main message handler logic is in index.ts.

  return bot;
}

// The old global 'bot' instance and 'startTelegramBot' are removed.
