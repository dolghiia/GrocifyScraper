const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, url, delimiters){
	let browser;
	try{
		browser = await browserInstance;
		food_data = await pageScraper.scraper(browser, url, delimiters);	
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
    finally{
    }
    return food_data;
}

module.exports = (browserInstance, url, delimiters) => scrapeAll(browserInstance, url, delimiters)