const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    (this.to = user.email),
      (this.name = user.name),
      (this.url = url),
      (this.from = `kartikeya <${process.env.EMAIL_FROM}>`);
  }

  //creating a transporter//
  newTransport() {
    //using sedngrid

    if (process.env.NODE_env === 'production') {
      console.log('in production');
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWOROD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //sending email//
  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  // different uses//
  async sendWelcome() {
    await this.send(
      'Welcome ',
      `Glad to see you at POSTBOX , please click on this link ${this.url} for verification to complete`
    );
  }
  async sendResetToken() {
    await this.send(
      'Welcome ',
      `Glad to see you at POSTBOX , your password token is ${this.url}`
    );
  }
};
