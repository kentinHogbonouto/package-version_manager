const CronJob = require("cron").CronJob;
const { exec} = require("child_process");
const fs = require('fs');

const job = new CronJob(
  "*/15 * * * * *",
  () => {
    const ls = exec("ncu --packageFile package.json", (err, stdout, stderr) =>{
      if(err){
        const error = new Error(err.message);
        error.status = 404;
        throw error;
      }
      if(stderr){
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      const redirectOutput = fs.WriteStream('./log.txt');
      process.stdout.write = process.stderr.write = redirectOutput.write.bind(redirectOutput);
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();
