const CronJob = require("cron").CronJob;
const { spawn } = require("child_process");

const job = new CronJob(
  "*/10 * * * * *",
  () => {
    const ls = spawn("ncu", ["--packageFile package.json"]);
    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();
