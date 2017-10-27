var method = Message.prototype;

function Message(from, to, subject, text) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
}

method.setText = function(text) {
    this.text = text;
}

module.exports = Message;