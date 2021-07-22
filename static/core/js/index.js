import { fetch_json_data, create_blog_cards, create_pagination } from "./utils.js";
import { BLOG_META_DATA_LOCATION, CARD_PER_PAGE_LIMIT } from "./constants.js";


function index_driver() {
    fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        try {
            // sending specific json data to the processing function
            process_meta_data(meta_data);
        }
        catch (err) {
            // try fetching the specific data from the json
            // if record not found then
            // redirect to error.html page
            // error code 1501 - Invalid Blog ID
            window.location.replace("error.html?err_code=1501");
            // console.log(err)
        }
    });
}

function process_meta_data(meta_data) {
    //console.log(meta_data);
    let blog_card_holder_container = document.getElementById("blog-card-holder");
    const blog_ids = Object.keys(meta_data);
    blog_ids.reverse();

    let number_of_pages = Math.ceil(blog_ids.length / CARD_PER_PAGE_LIMIT);

    for (let i = 1; i <= number_of_pages; i++) {
        let page_div = document.createElement("div");
        page_div.setAttribute("id", "page_" + (i));
        if (i == 1) {
            page_div.setAttribute("style", "display: block;");
        }
        else {
            page_div.setAttribute("style", "display: none;");
        }

        let temp_blog_id = blog_ids.slice(((i - 1) * CARD_PER_PAGE_LIMIT), (i * CARD_PER_PAGE_LIMIT));
        for (let j = 0; j < temp_blog_id.length; j++) {
            let is_blog_publish = meta_data[temp_blog_id[j]].publish;
            if (is_blog_publish != false && is_blog_publish != undefined) {
                let div1 = create_blog_cards(temp_blog_id[j], meta_data[temp_blog_id[j]]);
                page_div.appendChild(div1);
            } else {
                continue;
            }
        }
        blog_card_holder_container.appendChild(page_div);
    }
    let pagination = create_pagination(number_of_pages);
    // console.log(pagination);
    document.getElementById("pagination").appendChild(pagination);
}

index_driver()
