import {NextResponse} from "next/server";
import TelegramBot from 'node-telegram-bot-api';
import User from "@/app/lib/user-model";

const token = process.env.TELEGRAM_BOT_TOKEN;

let botInstance = null;

export const GET = async (req, res) => {
    try {
        if (!botInstance) {
            botInstance = new TelegramBot(token, {polling: true});

            botInstance.on('polling_error', (error) => {
                console.error('Polling error:', error);
            });

            console.log('Telegram bot started...');
        } else {
            console.log('Telegram bot is already running.');
        }

        botInstance.on('message', async (msg) => {
            const chatId = msg.chat.id;

            if (msg.text && msg.text.toLowerCase().startsWith('/start')) {
                await botInstance.sendMessage(chatId, `
This is a bot that will send you notifications about LeadFlow results

❗️ To initialize your account, send a message in the following format:
id <your id>`
                );
            } else if (msg.text && msg.text.toLowerCase().startsWith('id')) {
                const userId = msg.text.split(' ')[1];
                if (userId) {
                    console.log("Received user ID:", userId);
                    try {
                        const user = await User.findOneAndUpdate(
                            {_id: userId},
                            {chatId: chatId},
                            {new: true}
                        );

                        if (user) {
                            await botInstance.sendMessage(chatId, `✔️ Your Telegram chat is connected to the system\n\nYour Telegram ID: ${chatId}`);
                        } else {
                            await botInstance.sendMessage(chatId, '❌No user found with this ID');
                        }
                    } catch (error) {
                        console.error('Error saving chatId to database:', error);
                        await botInstance.sendMessage(chatId, '❌ An error occurred while saving your Telegram ID');
                    }
                } else {
                    await botInstance.sendMessage(chatId, "❗️ Please provide your ID in the following format:\n id <your id>");
                }
            } else {
                await botInstance.sendMessage(chatId, '❌ Unknown command');
            }
        });

        return NextResponse.json(
            { message: "Telegram bot started" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Server Error" },
            { status: 500 }
        );
    }
};


// // import { startBot } from '../../lib/telegram-bot';
// // import '../../lib/telegram-bot-handlers';
// //
// // export default function handler(req, res) {
// //     startBot();
// //     res.status(200).json({ message: 'Bot started' });
// // }
