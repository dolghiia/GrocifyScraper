const browserObject = require('./browser');
const scraperController = require('./pageController');
const Nofrills = require("./nofrills.js");
const Superstore = require("./superstore.js");
const Loblaws = require('./loblaws');


function count_shared(s1, s2) {
    var s1 = s1.toLowerCase();
    var s2 = s2.toLowerCase();
    const s1_set = new Set(s1.split(" "));
    const s2_set = new Set(s2.split(" "));
    var common_words = new Set([...s1_set].filter(i => s2_set.has(i)));
    return Array.from(common_words);
}

function get_most_shared(shared_terms) {
    var highest_len = 0;
    var highest_index = 0;
    for (i = 0; i < shared_terms.length; i++) {
        if (shared_terms[i][2].length > highest_len) {
            highest_len = shared_terms[i][2].length
            highest_index = i
        }
    }
    return shared_terms[highest_index]
}

async function pull_grocery_data(){
    const browserInstance = await browserObject.startBrowser();
    superstore_obj = new Superstore();
    nofrills_obj = new Nofrills();
    loblaws_obj = new Loblaws();
    var food_jsons = [];
    for (const [key, value] of Object.entries(nofrills_obj.urls)) {
        food_data = await scraperController(browserInstance, nofrills_obj.urls[key], nofrills_obj.delimiters);
        food_data_nofrills = food_data;
        food_prices_nofrills = nofrills_obj.parse_prices(food_data_nofrills["prices"]);
        food_data = await scraperController(browserInstance, superstore_obj.urls[key], superstore_obj.delimiters);
        food_data_superstore = food_data;
        food_prices_superstore = superstore_obj.parse_prices(food_data_superstore["prices"])
        //food_data = await scraperController(browserInstance, loblaws_obj.urls[key], loblaws_obj.delimiters);
        //food_data_loblaws = food_data;
        //food_prices_loblaws = loblaws_obj.parse_prices(food_data_loblaws["prices"])
        for (var i = 0; i < food_data_nofrills["names"].length; i++) {
            //var shared_terms_superstore = [];
            //for (var j = 0; j < food_data_superstore["names"].length; j++) {
            //    shared_terms_superstore.push([i, j, count_shared(food_data_nofrills["names"][i], food_data_superstore["names"][j])])
            //}
            //var shared_terms_loblaws = [];
            //for (var k = 0; k < food_data_loblaws["names"].length; k++) {
            //    shared_terms_loblaws.push([i, k, count_shared(food_data_nofrills["names"][i], food_data_loblaws["names"][k])])
            //}
            var shared_terms = [];
            for (var j = 0; j < food_data_superstore["names"].length; j++) {
            shared_terms.push([i, j, count_shared(food_data_nofrills["names"][i], food_data_superstore["names"][j])])
            }
            
            most_shared = get_most_shared(shared_terms);
            food_json = {name: food_data_nofrills["names"][most_shared[0]],
                         prices: {nofrills: food_prices_nofrills[most_shared[0]], superstore: food_prices_superstore[most_shared[1]]},
                         category: key,
                         image: food_data_nofrills["images"][most_shared[0]],
                         updatedAt: new Date(Date.now())}
            food_jsons.push(food_json)
            //console.log(food_json)
        }
    }
    await browserInstance.close() 
    return food_jsons
}


// Pass the browser instance to the scraper controller
//pull_grocery_data().catch(console.log);

module.exports = {
	pull_grocery_data
};