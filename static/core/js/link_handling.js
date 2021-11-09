export let ENV = "dev";


function run_link_handling() {
    if (ENV == "dev") {
        import("./config/dev_config.js")
            .then((config) => {
                handle_link(config.BASE_URL);
            });
    }
    else if (ENV == "prod") {
        // const BASE_URL = require("./config/prod_config.js").BASE_URL;
        import("./config/prod_config.js")
            .then((config) => {
                handle_link(config.BASE_URL);
            });
    }
}

/*
function run_link_handling() {
    if (ENV == "dev") {
        // DEV CONFIG
        let BASE_URL = "";
        handle_link(BASE_URL);
    }
    else if (ENV == "prod") {
        // DEV CONFIG
        let BASE_URL = "https://draggers21.github.io/";
        handle_link(BASE_URL);
    }
}
*/

function handle_link(BASE_URL) {
    let all_links = document.getElementsByTagName("a");
    for (var i = 0; i < all_links.length; i++) {
        let curr_href = all_links[i].getAttribute("href");
        // Only process internal links.
        if (curr_href.substring(0, 10) == "index.html" || curr_href.substring(0, 9) == "error.html" || curr_href.substring(0, 11) == "search.html" || curr_href.substring(0, 9) == "view.html") {
            all_links[i].setAttribute("href", BASE_URL + curr_href);
        }
    }
}

run_link_handling();