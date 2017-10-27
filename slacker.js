const CREDS = require('./creds');

var method = Slacker.prototype;

function Slacker() {
    //this._age = age;
    this.slack = require('slack-notify')(CREDS.slack.webhook);
}

method.send = function(message) {
    this.slack.send({
        channel: '@alexandertymchenko',
        icon_url: 'http://example.com/my-icon.png',
        text: message.text,
        unfurl_links: 1,
        username: message.subject
    });
};

module.exports = Slacker;