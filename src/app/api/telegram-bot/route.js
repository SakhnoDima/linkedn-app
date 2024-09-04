import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";
import botInstance from "@/app/lib/telegram-bot-init";

export const GET = async (req, res) => {
  try {
    botInstance.on("message", async (msg) => {
      const chatId = msg.chat.id;

      if (msg.text && msg.text.toLowerCase().startsWith("/start")) {
        await botInstance.sendMessage(
          chatId,
          `
This is a bot that will send you notifications about LeadFlow results

❗️ To initialize your account, send a message in the following format:
id <your id>`
        );
      } else if (msg.text && msg.text.toLowerCase().startsWith("id")) {
        const userId = msg.text.split(" ")[1];
        if (userId) {
          console.log("Received user ID:", userId);
          try {
            const user = await User.findOneAndUpdate(
              { _id: userId },
              { chatId: chatId },
              { new: true }
            );

            if (user) {
              await botInstance.sendMessage(
                chatId,
                `✔️ Your Telegram chat is connected to the system\n\nYour Telegram ID: ${chatId}`
              );
            } else {
              await botInstance.sendMessage(
                chatId,
                "❌No user found with this ID"
              );
            }
          } catch (error) {
            console.error("Error saving chatId to database:", error);
            await botInstance.sendMessage(
              chatId,
              "❌ An error occurred while saving your Telegram ID"
            );
          }
        } else {
          await botInstance.sendMessage(
            chatId,
            "❗️ Please provide your ID in the following format:\n id <your id>"
          );
        }
      } else if (msg.text && msg.text.toLowerCase().startsWith("hello")) {
        await botInstance.sendMessage(
          chatId,
          `Hello my friend! 
           🤓 Im your assistant, and going to inform you about new messages!
           ❗️ To initialize your account, send a message in the following format: id <your id>`
        );
      } else {
        await botInstance.sendMessage(chatId, "❌ Unknown command");
      }
    });

    return NextResponse.json(
      { message: "Telegram bot initialized successful!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
};
