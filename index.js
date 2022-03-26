const CronJob = require("cron").CronJob;
const { spawn } = require("child_process");
const fs = require("fs");

const job = new CronJob(
  "*/15 * * * * *",
  () => {
    spawn("ls",  (err, stdout, stderr) => {
      if (err) {
        const error = new Error(err.message);
        error.status = 404;
        throw error;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      // console.log(`stdout: ${stdout}`);
      // const outPut = JSON.parse(stdout);
      console.log(`outPut: ${stdout}`);
      // const redirectOutput = fs.WriteStream('./update-package.txt');
      // process.stdout.write = process.stderr.write = redirectOutput.write.bind(redirectOutput);
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();
