import { create_blog_cards } from "./utils.js";

function index_driver() {
    fetch('static/meta_data/blog_meta_data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            try {
                // sending specific json data to the processing function
                process_meta_data(data);
            }
            catch (err) {
                // try fetching the specific data from the json
                // if record not found then
                // redirect to error.html page
                // error code 1501 - Invalid Blog ID
                // window.location.replace("error.html?err_code=1501");
                console.log(err)
            }
        })
        .catch(function (err) {
            console.log("error" + err);
        });
}

function process_meta_data(meta_data) {
    //console.log(meta_data);
    let blog_card_holder_container = document.getElementById("blog-card-holder");
    const blog_ids = Object.keys(meta_data);
    blog_ids.reverse();

    for (var i = 0; i < blog_ids.length; i++) {
        let div1 = create_blog_cards(blog_ids[i], meta_data[blog_ids[i]]);
        blog_card_holder_container.append(div1);
    }
}

index_driver()
