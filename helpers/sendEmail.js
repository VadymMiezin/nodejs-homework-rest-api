const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
require("dotenv").config();

const { MAILGUN_API_KEY } = process.env;

const sendEmail = async (data) => {
  const mg = mailgun.client({
    username: "vadym.miezin@gmail.com",
    key: MAILGUN_API_KEY,
  });

  mg.messages
    .create("sandbox1940f0af52c8432cbafb3bbc23c95d67.mailgun.org", {
      from: "Mailgun Sandbox <vadym.miezin@gmail.com>",
      to: [data.to],
      subject: "Verify your email",
      text: "Please, verify your email",
      html: data.html,
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

module.exports = sendEmail;
