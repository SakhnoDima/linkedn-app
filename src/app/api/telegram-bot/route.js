import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";

export const POST = async (req) => {
  try {
    const data = await req.json();

    if (!data.userId || !data.chatId || !data.action) {
      return NextResponse.json(
        { message: "chatId and userId are required" },
        { status: 400 }
      );
    }

    console.log(
      "User ID:",
      data.userId,
      "Chat ID:",
      data.chatId,
      "action",
      data.action
    );

    const user = await User.findById(data.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    console.log(user.chatId);

    if (data.action === "add") {
      // Перевіряємо, чи вже є chatId у цього користувача
      if (user.chatId.includes(data.chatId)) {
        return NextResponse.json(
          { message: "Chat ID is already linked to this user" },
          { status: 200 }
        );
      }
      user.chatId.push(data.chatId);
      await user.save();
    } else if (data.action === "remove") {
      const newChatId = user.chatId.filter((elem) => elem !== data.chatId);
      user.chatId = newChatId;
      await user.save();
    }

    console.log("Chat ID saved successfully");

    return NextResponse.json(
      { message: "Chat ID updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
