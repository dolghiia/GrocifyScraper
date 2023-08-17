class Loblaws {
    constructor() {
        this.urls = {"vegetables": "https://www.loblaws.ca/food/fruits-vegetables/fresh-vegetables/c/28195?navid=flyout-L3-Fresh-Vegetables",
                     "fruits": "https://www.loblaws.ca/food/fruits-vegetables/fresh-fruits/c/28194?navid=flyout-L3-Fresh-Fruits",
                     "dairy": "https://www.loblaws.ca/food/dairy-eggs/c/28003?navid=flyout-L2-see-all-Dairy-and-Eggs",
                     "bakery": "https://www.loblaws.ca/food/bakery/c/28002?navid=flyout-L2-see-all-Bakery"
                    };
        this.delimiters = {"button_selector": "",
                           "food_selector": "#site-content > div > div > div.css-0 > div.css-15f73ke",
                           "food_price_delim": "#site-content > div > div > div.css-0 > div.css-15f73ke > div > div > div > div.css-wbarzq > div.css-k008qs > p",
                           "food_name_delim": "#site-content > div > div > div.css-0 > div.css-15f73ke > div > div > div > div.css-wbarzq > a > div > h3",
                           "food_img_delim": "#site-content > div > div > div.css-0 > div.css-15f73ke > div > div > div > div.css-1fqp6qq > img[src]"
                        };
    }

    parse_prices(prices){
        var parsed_prices = []
        var parsed_units = []
        for (price of prices) {
            var price = price.replace("about", "");
            price = price.replace("sale", "");
            price = price.replace("was", "");
            var parse_price = price.replace("$", "")
            var food_price = parseFloat(parse_price)
            parsed_units.push("ea")
            parsed_prices.push(food_price);
        }
        return parsed_prices;
    }
}
module.exports = Loblaws;