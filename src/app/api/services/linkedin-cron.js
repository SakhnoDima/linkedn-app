import cron from "node-cron";
import { errorList } from "./errors";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import axios from "axios";
import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";
import { timeCreator } from "../helpers";
import { EVENTS } from "./constants";

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

  startConnectionsTask(id, data, user, searchFilters) {
    console.log("Before start Init", this.userTasks);
    console.log("time before", data.cronTime.min, data.cronTime.hour);

    const time = timeCreator(
      data.cronTime.min,
      data.cronTime.hour,
      data.cronTime.timeZone
    );
    console.log("time after", time);

    if (!this.userTasks.has(data.userId.toString())) {
      this.userTasks.set(data.userId.toString(), {});
    }
    const tasks = this.userTasks.get(data.userId.toString());

    console.log("searchTags", data.keyWords);

    if (!tasks[id]) {
      const task = cron.schedule(time, async () => {
        try {
          axios
            .post(
              "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
              {
                id: data.userId,
                email: user.linkedinData.login,
                linkedPassword: user.linkedinData.password,
                taskId: id,
                chatId: user.chatId,
                levelOfTarget: 1,
                searchTags: data.keyWords,
                searchFilters,
                totalLettersPerDay: data.connections,
                taskPlatform: EVENTS.linkedin.name,
                taskType: EVENTS.linkedin.taskType.sendConnections,
                targetName: data.targetName,
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
                    taskType: EVENTS.linkedin.taskType.sendConnections,
                    taskName: res.targetName,
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

  startCompaniesTask(id, data, user, searchFilters) {
    console.log("Before start Init", this.userTasks);
    console.log("time before", data.cronTime.min, data.cronTime.hour);

    console.log("id", id);
    console.log("data", data);
    console.log("user", user);
    console.log("searchFilters", searchFilters);

    const time = timeCreator(
      data.cronTime.min,
      data.cronTime.hour,
      data.cronTime.timeZone
    );
    console.log("time after", time);

    if (!this.userTasks.has(data.userId.toString())) {
      this.userTasks.set(data.userId.toString(), {});
    }
    const tasks = this.userTasks.get(data.userId.toString());

    if (!tasks[id]) {
      const task = cron.schedule(time, async () => {
        try {
          console.log("In cron !!");

          //TODO add your URL to scrapper
          axios
            .post(
              "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
              {
                id: data.userId,
                taskId: id,
                chatId: user.chatId,
                searchWords: data.keyWords,
                searchFilters,
                messageData: {
                  Topic: data.topic,
                  LetterText: data.letterText,
                },
                totalLettersPerDay: data.connections,
                email: user.linkedinData.login,
                linkedPassword: user.linkedinData.password,
                taskPlatform: EVENTS.linkedin.name,
                taskType: EVENTS.linkedin.taskType.companiesMessages,
                targetName: data.targetName,
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
                    taskType: EVENTS.linkedin.taskType.companiesMessages,
                    taskName: res.targetName,
                    userId: user._id,
                    targetTaskId: data._id,
                    date: new Date().toISOString().split("T")[0],
                    error: res.error,
                    levelOfTarget: res.levelOfTarget,
                    totalLettersPerDay: res.totalLettersPerDay,
                    totalInvitationSent: res.totalMessages,
                    searchTags: res.searchWords,
                    invitedCompanies: res.companiesData,
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

  invitationLettersTask(id, data, user) {
    console.log("Before start Init", this.userTasks);

    console.log("id", id.toString());
    console.log("data", data);
    console.log("user", user._id.toString());

    if (!this.userTasks.has(user._id.toString())) {
      this.userTasks.set(user._id.toString(), {});
    }
    const tasks = this.userTasks.get(user._id.toString());

    if (!tasks[id]) {
      const task = cron.schedule("0 */4 * * *", async () => {
        try {
          console.log("In cron !!");

          //TODO add your URL to scrapper
          axios
            .post(
              "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
              {
                id: user._id,
                taskId: id,
                email: user.linkedinData.login,
                taskPlatform: EVENTS.linkedin.name,
                taskType: EVENTS.linkedin.taskType.connectionsMessage,
                linkedPassword: user.linkedinData.password,
                searchWords: data.includesWords,
                message: data.letterText,
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

                  //! errorList.removeError(user._id.toHexString());
                  //! if (res.error) {
                  //!   errorList.addError(user._id.toHexString(), res.error);
                  //!}
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
    console.log(taskId);

    if (this.userTasks.has(userId)) {
      const tasks = this.userTasks.get(userId);
      const task = tasks[taskId];
      if (task) {
        task.stop();
        delete tasks[taskId];
        console.log(`Cron task ${taskId} stopped`);
        console.log("After del", this.userTasks);
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

export const LinkedinTaskService = new TaskServiceClass();
