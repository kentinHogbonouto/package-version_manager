const CronJob = require("cron").CronJob;
const { exec } = require("child_process");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

job = new CronJob(
  "*/60 * * * * *",
  () => {
    exec("npm outdated",  (err, stdout, stderr) => {
      if (err) {
        console.error(err.message);
      }
      if (stderr) {
        console.log(stderr);
      }
      const outPut = JSON.stringify(stdout);
      console.log(`stdout: ${outPut}`);
      const redirectOutput =  fs.WriteStream("./update-package.txt");
      process.stdout.write = process.stderr.write =
        redirectOutput.write.bind(redirectOutput);

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "test@example.com", // Change to your recipient
        from: "test@example.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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

// child.stdout.on("data", (data) => {
//   console.log("Stdout:\n", Buffer.from(data).toString());
// });
// child.stderr.on("data", (data) => {
//   console.error(Buffer.from(data).toString());
// });
// child.on("error", (error) => {
//   console.error("Error:\n", error);
// });
// child.on("exit", (code, signal) => {
//   if (code) console.error("Process exit with code:", code);
//   else if (signal) console.error("Process killed with signal:", signal);
//   else console.log("Done successfull ✅");
// });