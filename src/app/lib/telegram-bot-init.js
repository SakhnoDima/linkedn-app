import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN;

let botInstance = null;

if (!botInstance) {
  console.log(" --  Telegram bot is`nt defined! -- ");
  console.log(" --  Initial bot START -- ");
  botInstance = new TelegramBot(token, { polling: true });

  botInstance.on("polling_error", (error) => {
    console.error("Polling error:", error);
  });
  console.log(" -- Telegram bot initialized successful! -- ");
} else {
  console.log(" --  Telegram bot already defined! -- ");
}

export default botInstance;
