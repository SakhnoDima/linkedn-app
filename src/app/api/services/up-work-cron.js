import cron from "node-cron";
import { errorList } from "./errors";
import axios from "axios";
import { timeCreator, transformQuery } from "../helpers";
import User from "@/app/lib/user-model";
import { EVENTS } from "./constants";

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

class CronUpWorkClass {
  constructor() {
    this.userTasks = new Map();
  }

  async startScanner(userId, scannerData, user) {
    console.log("Before start Init", this.userTasks);

    if (!this.userTasks.has(userId)) {
      this.userTasks.set(userId, {});
    }
    const tasks = this.userTasks.get(userId);
    console.log("Scanner data", scannerData);

    const time = timeCreator(
      scannerData.cronTime.min,
      scannerData.cronTime.hour,
      scannerData.cronTime.timeZone
    );
    console.log("Time", time);

    if (!tasks[scannerData._id]) {
      const task = cron.schedule(time, async () => {
        try {
          console.log("START");
          await axios
            .post(
              "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
              {
                key: "upWork",
                id: scannerData.userId,
                taskId: scannerData._id,
                chatId: user.chatId,
                userEmail: user.email,
                accountType: user.status, // 'freelancer-account' or 'agency-account'
                taskPlatform: EVENTS.upWork.name,
                taskType: EVENTS.upWork.taskType.sendProposals,
                scannerName: scannerData.scannerName,
                autoBidding: scannerData.autoBidding,
                usOnly: user.accountUsOnly,
                searchWords: transformQuery(
                  scannerData.searchWords.includeWords,
                  scannerData.searchWords.excludeWords
                ),
                searchFilters: {
                  usOnly: scannerData.usOnly,
                  ...scannerData.searchFilters,
                  category:
                    scannerData.searchFilters.category.length > 0
                      ? scannerData.searchFilters.category
                          .split(" | ")
                          .map((item) => item.trim())
                      : [],
                  clientLocation:
                    scannerData.searchFilters.clientLocation.length > 0
                      ? scannerData.searchFilters.clientLocation
                          .split(" | ")
                          .map((item) => item.trim())
                      : [],
                },
                clientParameters: scannerData.clientParameters,
                biddingOptions: scannerData.biddingOptions,
                coverLetterOptions: scannerData.coverLetterOptions,
              }
            )
            .then((createTaskResponse) => {
              const taskId = createTaskResponse.data.taskId;
              console.log("Task started with ID:", taskId);
            });
        } catch (error) {
          console.log("Error in init cron", error);
        }
      });
      tasks[scannerData._id] = task;
      console.log("After start Init", this.userTasks);
      console.log(`Cron task ${scannerData._id} started`);
    } else {
      console.log(`Scanner ${id} is already running`);
    }
  }

  async startTelegramNotification(userId) {
    console.log("Before start Init", this.userTasks);

    if (!this.userTasks.has(userId)) {
      this.userTasks.set(userId, {});
    }
    const tasks = this.userTasks.get(userId);

    if (!tasks[userId]) {
      const task = cron.schedule("*/15 * * * *", async () => {
        try {
          console.log("START");

          const user = await User.findOne({ _id: userId });

          await axios.post(
            "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
            {
              id: userId,
              taskId: userId,
              chatId: user.chatId,
              taskPlatform: EVENTS.upWork.name,
              taskType: EVENTS.upWork.taskType.getInfo,
              accountType: user.status,
              usOnly: user.accountUsOnly,
            }
          );
        } catch (error) {
          console.error("Send telegram message error", error);
        }
      });
      tasks[userId] = task;
      console.log("After start Init", this.userTasks);
      console.log(`Cron task ${userId} started`);
    } else {
      console.log(`Scanner ${id} is already running`);
    }
  }

  async stopScanner(userId, taskId) {
    const newUserId = userId.toString();

    console.log(this.userTasks);

    if (this.userTasks.has(newUserId)) {
      const tasks = this.userTasks.get(newUserId);
      const task = tasks[taskId];
      if (task) {
        task.stop();
        delete tasks[taskId];
        console.log(`Scanner ${taskId} was stopped`);
      } else {
        console.log(`Scanner ${taskId} for user ${newUserId} is not running`);
      }
    } else {
      console.log(`No scanners for user ${newUserId}`);
    }
  }

  getScanners() {
    return Object.keys(this.tasks);
  }
}

export const CronUpWork = new CronUpWorkClass();
