// lib/TaskService.js
import cron from "node-cron";
import { errorList } from "./errors";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import axios from "axios";
import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";

async function checkTaskStatus(taskId) {
  let isLinkedinAuth = false;

  const interval = setInterval(async () => {
    try {
      const statusResponse = await axios.post(
        "https://dim6czm31f.execute-api.eu-north-1.amazonaws.com/default/lambda-check-task-status",
        {
          id: taskId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (statusResponse.data.status === "completed") {
        console.log("Task completed:", statusResponse.data.result);
        isLinkedinAuth = JSON.parse(statusResponse.data.result);
        clearInterval(interval);
      } else {
        console.log("Task is still processing");
      }
    } catch (error) {
      console.error("Error checking task status:", error);
    }
  }, 10000);

  while (true) {
    if (isLinkedinAuth !== false) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return isLinkedinAuth;
}

class TaskServiceClass {
  constructor() {
    this.userTasks = new Map();
  }

  startTask(id, data, user, searchFilters) {
    console.log("Before start Init", this.userTasks);

    if (!this.userTasks.has(data.userId)) {
      this.userTasks.set(data.userId, {});
    }
    const tasks = this.userTasks.get(data.userId);

    if (!tasks[id]) {
      const task = cron.schedule("0 0 * * * *", async () => {
        console.log(user.email);
        try {
          axios
            .post(
              "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
              {
                id: data.userId,
                levelOfTarget: 1,
                searchTags: data.keyWords,
                searchFilters,
                totalLettersPerDay: data.connections,
                invitationLetters: [""],
                email: user.email,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((createTaskResponse) => {
              const taskId = createTaskResponse.data.taskId;
              console.log("Task started with ID:", taskId);
              checkTaskStatus(taskId)
                .then((res) => {
                  console.log("res", res);

                  errorList.removeError(user._id.toHexString());

                  if (res.error) {
                    errorList.addError(user._id.toHexString(), res.error);
                  }

                  LinkedinCompletedTasks.create({
                    taskName: data.targetName,
                    userId: user._id,
                    targetTaskId: data._id,
                    date: new Date().toISOString().split("T")[0],
                    error: res.error,
                    levelOfTarget: res.levelOfTarget,
                    totalClicks: res.totalClicks,
                    totalLettersPerDay: res.totalLettersPerDay,
                    totalInvitationSent: res.totalInvitationSent,
                    searchTags: res.searchTags,
                    userNames: [...res.userNames],
                    searchFilters: {
                      Locations: Array.isArray(res.searchFilters?.Locations)
                        ? [...res.searchFilters.Locations]
                        : [],
                      "Profile language": Array.isArray(
                        res.searchFilters?.["Profile language"]
                      )
                        ? [...res.searchFilters["Profile language"]]
                        : [],
                      Keywords: res.searchFilters?.Keywords || "",
                      Industry: Array.isArray(res.searchFilters?.Industry)
                        ? [...res.searchFilters.Industry]
                        : [],
                      "Service categories": Array.isArray(
                        res.searchFilters?.["Service categories"]
                      )
                        ? [...res.searchFilters["Service categories"]]
                        : [],
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                  console.log("in catch after check task status");
                  LinkedinFilters.findByIdAndUpdate(
                    { _id: data._id },
                    {
                      status: false,
                    },
                    { new: true }
                  );
                });
            });
        } catch (error) {
          console.log(error);
        }
      });
      tasks[id] = task;
      console.log("After start Init", this.userTasks);
      console.log(`Cron task ${id} started`);
    } else {
      console.log(`Task ${id} is already running`);
    }
  }

  async stopTask(userId, taskId) {
    if (this.userTasks.has(userId)) {
      const tasks = this.userTasks.get(userId);
      const task = tasks[taskId];
      if (task) {
        task.stop();
        delete tasks[taskId];
        console.log(`Cron task ${taskId} stopped`);
        console.log("After del", this.userTasks);
        await LinkedinFilters.findByIdAndUpdate(
          { _id: taskId },
          {
            status: false,
          },
          { new: true }
        )
          .then((updateRes) => {
            console.log("Database updated successfully:", updateRes);
          })
          .catch((err) => {
            console.error("Error updating database:", err);
          });
      } else {
        console.log(`Task ${taskId} for user ${userId} is not running`);
      }
    } else {
      console.log(`No tasks for user ${userId}`);
    }
  }

  getTasks() {
    return Object.keys(this.tasks);
  }
}

export const TaskService = new TaskServiceClass();
