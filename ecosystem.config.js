module.exports = {
  apps: [
    {
      name: "my-next-app",
      script: "npm",
      args: "run start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
