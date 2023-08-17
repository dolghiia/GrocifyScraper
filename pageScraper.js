const scraperObject = {
	async scraper(browser, url, delimiters){
		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
		await page.goto(url);
        const cssSelector = delimiters["button_selector"];

        const isElementVisible = async (page, cssSelector) => {
            let visible = true;
            await page
              .waitForSelector(cssSelector, { visible: true, timeout: 3000 })
              .catch(() => {
                visible = false;
              });
            return visible;
          };

        let loadMoreVisible = await isElementVisible(page, cssSelector);
        while (loadMoreVisible) {
            await page
                .click(cssSelector)
                .catch(() => {});
            loadMoreVisible = await isElementVisible(page, cssSelector);
        }

        await page.waitForSelector(delimiters["food_selector"], {"visible": true});
        const food_names = await page.$$eval(delimiters["food_name_delim"], food_names => {
            return food_names.map(option => option.textContent);
        });
        const food_prices = await page.$$eval(delimiters["food_price_delim"], food_prices => {
            return food_prices.map(option => option.textContent);
        });
        const food_imgs = await page.$$eval(delimiters["food_img_delim"], food_imgs => {
            return food_imgs.map(option => option.getAttribute('src'));
        });   
        return {"names": food_names, "prices": food_prices, "images": food_imgs};
	}
}

module.exports = scraperObject;