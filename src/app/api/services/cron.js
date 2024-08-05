// lib/TaskService.js
import cron from "node-cron";

class TaskServiceClass {
  constructor() {
    this.tasks = {};
  }

  startTask(id) {
    if (!this.tasks[id]) {
      const task = cron.schedule("*/10 * * * * *", () => {
        console.log(`Task ${id} runs every 10 seconds`);
      });
      this.tasks[id] = task;
      console.log(`Cron task ${id} started`);
    } else {
      console.log(`Task ${id} is already running`);
    }
  }

  stopTask(id) {
    const task = this.tasks[id];
    if (task) {
      task.stop();
      delete this.tasks[id];
      console.log(`Cron task ${id} stopped`);
    } else {
      console.log(`Task ${id} is not running`);
    }
  }

  getTasks() {
    return Object.keys(this.tasks);
  }
}

export const TaskService = new TaskServiceClass();
