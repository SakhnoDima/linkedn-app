import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const chatId = String(data.chatId);

    if (!data.userId || !chatId || !data.action) {
      return NextResponse.json(
        { message: "chatId and userId are required" },
        { status: 400 }
      );
    }

    console.log(
      "User ID:",
      data.userId,
      "Chat ID:",
      chatId,
      "action",
      data.action
    );

    const user = await User.findById(data.userId);

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    console.log(user.chatId);

    if (data.action === "add") {
      // Перевіряємо, чи вже є chatId у цього користувача
      if (user.chatId.includes(chatId)) {
        console.log("Telegram ID is already added to the system");
        return NextResponse.json(
            { message: "Telegram ID is already added to the system" },
            { status: 200 }
        );
      }

      // Додаємо chatId до масиву
      user.chatId.push(chatId);
      await user.save();
      console.log("Chat ID added successfully");
      return NextResponse.json(
          { message: "Chat ID added successfully" },
          { status: 200 }
      );

    } else if (data.action === "remove") {
      // Перевіряємо, чи існує chatId у масиві
      if (!user.chatId.includes(chatId)) {
        console.log("Telegram ID is not previously added to the system");
        return NextResponse.json(
            { message: "Telegram ID is not previously added to the system" },
            { status: 200 }
        );
      }

      // Видаляємо chatId з масиву
      user.chatId = user.chatId.filter((elem) => elem !== chatId);
      await user.save();
      console.log("Chat ID removed successfully");
      return NextResponse.json(
          { message: "Chat ID removed successfully" },
          { status: 200 }
      );

    } else {
      // Невідома дія
      console.log("Invalid action");
      return NextResponse.json(
          { message: "Invalid action" },
          { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
