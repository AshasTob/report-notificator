const CREDS = require('./creds');

var method = Mailer.prototype;

function Mailer() {
    //this._age = age;
    this.nodemailer = require('nodemailer');
    this.transporter = this.nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: CREDS.smtp.username,
            pass: CREDS.smtp.password
        }
    });
}

method.send = function(message) {
    this.transporter.sendMail(message, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = Mailer;