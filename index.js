const CronJob = require("cron").CronJob;
const { exec } = require("child_process");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

job = new CronJob(
  "*/60 * * * * *",
  () => {
    exec("npm outdated", (err, stdout, stderr) => {
      if (err) {
        console.error(err.message);
      }
      if (stderr) {
        console.log(stderr);
      }
      const outPut = JSON.stringify(stdout);
      console.log(`stdout: ${outPut}`);
      const redirectOutput = fs.WriteStream("./update-package.txt");
      process.stdout.write = process.stderr.write =
        redirectOutput.write.bind(redirectOutput);

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "adminmail@gmail.com", // Change to your recipient
        from: "kentinhogbonouto1@gmail.com", // Change to your verified sender
        subject: "node packages updated repport",
        html: "<strong>Dear admin, kindly open the attachment \nfile bellow to check whole the packages out to date whitin your api. you will receive this mail every 72 hours</strong>",
        Attachment: redirectOutput,
      };

      sgMail.send(msg);
      return (response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      };
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
