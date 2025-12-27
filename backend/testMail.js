require("dotenv").config();
const sendMail = require("./services/sendMail");

sendMail({
  to: "web.aloksingh8190@gmail.com",
  subject: "SMTP Test",
  html: "<h1>SMTP working!</h1>",
})
.then(() => console.log("Mail sent"))
.catch(console.error);
