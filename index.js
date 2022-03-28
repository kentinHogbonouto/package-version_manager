const exec = require("child_process").exec;
const CronJob = require("cron").CronJob;
const fs = require("fs");
const { stdout } = require("process");

const Job = new CronJob(
  "*/60 * * * * *",
  () => {
    function execAsync(command) {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error !== "") {
            console.log(error);
          }
          if (stderr !== "") {
            console.log(`stderr:  ${stderr}`);
            reject(stderr);
          } else {
            resolve(stdout);
            console.log(`stdout:  ${stdout}`);
          }
        });
      });
    }

    async function main() {
      try {
        const resultat = await execAsync("npm-check");
        const redirectStdOut = fs.WriteStream(updateFileDirectory);
        process.stdout.write = process.stderr.write = redirectStdOut.write.bind(redirectStdOut);
      } catch (err) {
        console.log(err);
      }
    }
    main();
  },
  null,
  true,
  "America/Los_Angeles"
);
Job.start();