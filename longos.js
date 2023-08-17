class Longos {
    constructor() {
        this.urls = {"vegetables": "https://www.longos.com/Fresh-Vegetables/c/701-6085",
                     "fruits": "https://www.longos.com/Fruits/c/701-6072",
                     "dairy": "https://www.longos.com/Dairy-and-Eggs/c/706",
                     "bakery": "https://www.longos.com/Bakery/c/704"
                    };
        this.delimiters = {"button_selector": ".load-btn-container > button",
                           "food_selector": "main",
                           "food_name_delim": "a > h5",
                           "food_price_delim": "div > .price-wrap:not(.price-per-kilo)"
                        };
    }

    parse_prices(prices){
        var parsed_prices = []
        var parsed_units = []
        for (var price of prices) {
            var parse_price = price.split("/")[0].split(" ");
            var dollar = parse_price[1].slice(1, -2)
            var cents = parse_price[1].slice(-2)
            var food_price = parseFloat(dollar.concat(".", cents))
            parsed_units.push(price.split("/")[1].slice(1))
            parsed_prices.push(food_price);
        }
        return parsed_prices;
    }
}
module.exports = Longos;