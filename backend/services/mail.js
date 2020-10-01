'use strict';

const nodemailer = require('nodemailer');

let transporter;
const mail = (module.exports = {});

mail.init = async () => {
  const smtp_host = process.env.SMTP_HOST,
    smtp_port = process.env.SMTP_PORT,
    smtp_user = process.env.SMTP_USER,
    smtp_pass = process.env.SMTP_PASS;

  if (!smtp_host || !smtp_port) {
    console.error('SMTP credentials are not defined!');
    return process.exit();
  }
  //mail settings for outlook
  let SMTP_settings = {
    host: smtp_host,
    port: smtp_port,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: smtp_user,
      pass: smtp_pass,
    },
  };

  if (process.env.NODE_ENV === 'dev') {
    let testAccount = await nodemailer.createTestAccount();
    SMTP_settings = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  }
  transporter = nodemailer.createTransport(SMTP_settings);
  transporter
    .verify()
    .then(success => {
      console.log(success);
    })
    .catch(err => {
      console.log(err);
    });
};

mail.sendMail = async function(signupId, signupObj, flag = 'register') {
  let link = `${process.env.PUBLIC_URL}/activate?hash=`;
  let subject = 'Confirm your account';
  let text = `You have successfully registered to All to X. Your username is ${signupObj.username}. Click the link below to complete the registration:\n\n`;
  if (process.env.NODE_ENV === 'dev') {
    link = 'http://localhost:3000/activate?hash=';
  }
  link += signupId;
  if (flag === 'recover') {
    subject = 'Reset your password';
    text =
      'You have requested to reset your password. To change your password, click the link below and go to your profile page to reset your password. If you did not request this, ignore this message.\n\n';
  }
  text += link + '\n\n';
  text += 'In case of problems, please contact tuomas.kontola@ayy.fi';

  const options = {
    from: '"TK" <tuomas.kontola@ayy.fi>',
    to: signupObj.email,
    subject: subject,
    text: text,
  };
  try {
    const info = await transporter.sendMail(options);
    console.log(info);
    if (process.env.NODE_ENV === 'dev') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return 1;
  } catch (err) {
    console.error(err);
  }
};
