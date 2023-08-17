const puppeteer = require('puppeteer');
const PCR = require("puppeteer-chromium-resolver");

async function startBrowser(){
	let browser;
	try {
		const options = {};
		const stats = await PCR(options);
	    console.log("Opening the browser......");
		browser = await stats.puppeteer.launch({
			headless: "new",
			args: ["--no-sandbox"],
			executablePath: stats.executablePath
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};