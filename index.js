const puppeteer = require('puppeteer');

const CREDS = require('./creds');
const NAV = require('./navigation');

async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(CREDS.service, {
        waituntil: "networkidle"
    });
    //LOGGING IN THE SYSTEM;
    await page.click(NAV.nameFieldInputSelector);
    await page.keyboard.type(CREDS.target.username);
    await page.click(NAV.passwordFieldInputSelector);
    await page.keyboard.type(CREDS.target.password);
    await page.click(NAV.submitLoginButtonSelector);

    //LOADED INDEX DASHBOARD. REDIRECTING TO REPORTS PAGE.
    await page.waitFor(10000);
    let frame = await page.frames().find(f => f.name() === NAV.iframeId);
    const link = await frame.$(NAV.reportsLinkSelector);
    link.click();

    //REPORTS PAGE SCANNING.
    await page.waitFor(10000);
    frame = await page.frames().find(f => f.name() === NAV.iframeId);
    const report = await frame.$(NAV.reportTableItem);

    let reportText = await frame.evaluate((sel) => {
        let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
}, NAV.reportTableItem);

    console.log(reportText);

    var Message = require("./message.js");
    var message = new Message(
        'bratokokok@gmail.com',
        'bratokokok@gmail.com',
        'Reports notification',
        ''
    );

    if (reportText === CREDS.target.errorText) {
        message.setText("There is an issue. Missing report on " + new Date());
        console.log(message.text);
        var Slacker = require("./slacker.js");
        var slacker = new Slacker();
        var Mailer = require("./mailer.js");
        var mailer = new Mailer();
        mailer.send(message);
        slacker.send(message);
    } else {
        console.log("All is good");
    }

    browser.close();
}
run();