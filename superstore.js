class Superstore {
    constructor() {
        this.urls = {"vegetables": "https://www.realcanadiansuperstore.ca/food/fruits-vegetables/fresh-vegetables/c/28195?navid=flyout-L3-Fresh-Vegetables",
                     "fruits": "https://www.realcanadiansuperstore.ca/food/fruits-vegetables/fresh-fruits/c/28194?navid=flyout-L3-Fresh-Fruits",
                     "dairy": "https://www.realcanadiansuperstore.ca/food/dairy-eggs/cheese/c/28225?navid=flyout-L3-Cheese",
                     "bakery": "https://www.realcanadiansuperstore.ca/food/bakery/bread/c/28251?navid=flyout-L3-Bakery-Bread"
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
module.exports = Superstore