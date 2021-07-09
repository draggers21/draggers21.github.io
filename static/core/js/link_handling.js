let ENV = "prod";

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


function handle_link(BASE_URL) {
    console.log(BASE_URL);
    let all_links = document.getElementsByTagName("a");
    for (var i=0; i < all_links.length; i++) {
        let curr_href = all_links[i].getAttribute("href");
        all_links[i].setAttribute("href", BASE_URL + curr_href);
    }
}

run_link_handling();