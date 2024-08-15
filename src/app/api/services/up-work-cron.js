import cron from "node-cron";
import { errorList } from "./errors";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import axios from "axios";
import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";
import { transformQuery } from "../helpers";

class CronUpWorkClass {
  constructor() {
    this.userTasks = new Map();
  }

  startScanner(userId, scannerData, userEmail) {
    console.log("Before start Init", this.userTasks);

    if (!this.userTasks.has(userId)) {
      this.userTasks.set(userId, {});
    }
    const tasks = this.userTasks.get(userId);

    if (!tasks[scannerData._id]) {
      const task = cron.schedule("*/5 * * * *", async () => {
        try {
          axios
            .post("http://localhost:3001/upwork", {
              _id: scannerData._id,
              userId: scannerData.userId,
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
            })
            .then((res) => console.log(11));
        } catch (error) {
          console.log(error);
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
