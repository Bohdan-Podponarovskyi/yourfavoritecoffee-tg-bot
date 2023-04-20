require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Set up the Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

module.exports = bot;