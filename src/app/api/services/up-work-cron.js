import cron from "node-cron";
import { errorList } from "./errors";
import axios from "axios";
import { timeCreator, transformQuery } from "../helpers";

class CronUpWorkClass {
  constructor() {
    this.userTasks = new Map();
  }

  async startScanner(userId, scannerData, userEmail) {
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
                userEmail: userEmail,
                scannerName: scannerData.scannerName,
                autoBidding: scannerData.autoBidding,
                searchWords: transformQuery(
                  scannerData.searchWords.includeWords,
                  scannerData.searchWords.excludeWords
                ),
                searchFilters: {
                  ...scannerData.searchFilters,
                  category:
                    scannerData.searchFilters.category.length > 0
                      ? scannerData.searchFilters.category
                          .split(" | ")
                          .map((item) => item.trim())
                      : null,
                  clientLocation:
                    scannerData.searchFilters.clientLocation.length > 0
                      ? scannerData.searchFilters.clientLocation
                          .split(" | ")
                          .map((item) => item.trim())
                      : null,
                },
                clientParameters: scannerData.clientParameters,
                biddingOptions: scannerData.biddingOptions,
                coverLetterOptions: scannerData.biddingOptions,
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
