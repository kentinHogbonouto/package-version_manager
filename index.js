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
            console.log(error.message);
          }
          if (stderr !== "") {
            console.log(`stderr:  ${stderr}`);
            reject(stderr);
          } else {
            resolve(stdout);
            console.log("stdout" + stdout);
          }
        });
      });
    }

    async function main() {
      try {
        const fileDate = Date.now.toString();
        const resultat = await execAsync("npm-check" && `touch update-package-${fileDate}`);
        const redirectStdOut = fs.WriteStream("./update-package.txt");
        process.stdout.write = process.stderr.write =
          redirectStdOut.write.bind(redirectStdOut);
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