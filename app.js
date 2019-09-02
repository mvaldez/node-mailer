const nodemailer = require('nodemailer');
const fs = require('fs')

const getOptions = function(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename).toString())
    } catch (e) {
        throw e
    }
}

const phone = process.argv[2]
const message = process.argv[3]

const creds = getOptions('credentials.json')
const options = getOptions('mailOptions.json')

let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465,
    secure: true,
    auth: {
        user: creds.user,
        pass: creds.pass
    }
});

let mailOptions = {
    from: options.from,
    to: `${phone}@txt.att.net`,
    subject: options.subject,
    text: message
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
