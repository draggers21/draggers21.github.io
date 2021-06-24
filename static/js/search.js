import { fetch_meta_data } from "./utils.js";
import { BLOG_META_DATA_LOCATION, AUTHOR_BLOG_ID_MAPPING, DATE_TO_BLOG_ID_MAPPING, TAGS_TO_BLOG_ID_MAPPING } from "./constants.js";

const params = new URLSearchParams(window.location.search);
if (!params) {
    // show error if no params are passed
    window.location.replace("index.html");
}
else {
    if (!params.has("query")) {
        // show error if no params are passed
        window.location.replace("index.html");
    }
    else {
        const raw_query = params.get("query");

        // add query to dom
        document.getElementById("search-query").innerHTML = "Search query:&emsp;'&nbsp;" + raw_query + "&nbsp;'";

        if (raw_query.includes(":")) {
            // this code block is when there are filters
            const query_arr = raw_query.split(":");
            parse_filters(query_arr);
        }
        else {
            // search in title by default
            search_title(raw_query);
        }
    }
}

function parse_filters(query_arr) {
    const filter_name = query_arr[0];
    const search_param = query_arr[1];

    // console.log(filter_name);
    if (filter_name == "author") {
        search_author(search_param);
    }
    else if (filter_name == "title") {
        search_title(search_param);
    }
    else if (filter_name == "tags") {
        search_tags(search_param);
    }
    else if (filter_name == "date") {
        search_date(search_param);
    }
}

function regex_match(string_to_search, string_to_search_in) {
    let pattern = new RegExp(string_to_search, "gim");
    return pattern.test(string_to_search_in);
}

function search_title(search_string) {
    let pattern = new RegExp(search_string, "gim");
    let meta_data_location = "static/meta_data/blog_meta_data.json";
    let meta_data = fetch_meta_data(meta_data_location);
}

// done
function search_author(search_string) {
    fetch_meta_data(AUTHOR_BLOG_ID_MAPPING).then(function (meta_data) {
        let all_authors = Object.keys(meta_data);
        let all_related_blog_ids = [];
        for (let i = 0; i < all_authors.length; i++) {
            if (regex_match(search_string.toLowerCase(), all_authors[i].toLowerCase())) {
                for (var j = 0; j < meta_data[all_authors[i]].length; j++) {
                    all_related_blog_ids.push(meta_data[all_authors[i]][j]);
                }
                break;
            }
        }
        // console.log(all_related_blog_ids);
        display_content(all_related_blog_ids);
    });
}

// done
function search_tags(search_string) {
    fetch_meta_data(TAGS_TO_BLOG_ID_MAPPING).then(function (meta_data) {
        let all_tags = Object.keys(meta_data);
        let all_related_blog_ids = [];
        for (let i = 0; i < all_tags.length; i++) {
            if (regex_match(search_string.toLowerCase(), all_tags[i].toLowerCase())) {
                for (var j = 0; j < meta_data[all_tags[i]].length; j++) {
                    all_related_blog_ids.push(meta_data[all_tags[i]][j]);
                }
                break;
            }
        }
        // console.log(all_related_blog_ids);
        display_content(all_related_blog_ids);
    });
}

// done
function search_date(search_string) {
    fetch_meta_data(DATE_TO_BLOG_ID_MAPPING).then(function (meta_data) {
        let month = search_string.split(" ")[0];
        let year = search_string.split(" ")[1];
        display_content(meta_data[year][month]);
    });
}


function display_content(blog_ids) {
    fetch_meta_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        let search_results_container = document.getElementById("search-results");
        for (let i = 0; i < blog_ids.length; i++) {
            
            let blog_id = blog_ids[i];
            let blog_title = meta_data[blog_id].blog_title;
            let blog_author = meta_data[blog_id].blog_author;
            let blog_publish_date = meta_data[blog_id].blog_publish_date;
            let blog_tags = meta_data[blog_id].blog_tags;
            let blog_summary = meta_data[blog_id].blog_summary;

            let div1 = document.createElement("div");
            div1.setAttribute("class", "row blog_card");

            let div2 = document.createElement("div");
            div2.setAttribute("class", "col");

            let div3 = document.createElement("div");
            div3.setAttribute("class", "card text-justify");

            let div4 = document.createElement("div");
            div4.setAttribute("class", "card-body blog-card");

            let blog_title_container = document.createElement("h3");
            blog_title_container.setAttribute("class", "card-title");
            blog_title_container.innerHTML = blog_title;

            let blog_author_container = document.createElement("p");
            blog_author_container.setAttribute("class", "card-text");
            blog_author_container.innerHTML = "Author: " + blog_author;

            let blog_date_container = document.createElement("p");
            blog_date_container.setAttribute("class", "card-text");
            blog_date_container.innerHTML = "Date Published: " + blog_publish_date;

            let blog_tags_container = document.createElement("p");
            blog_tags_container.setAttribute("class", "card-text");
            blog_tags_container.innerHTML = "Tags: ";
            for (let j = 0; j < blog_tags.length; j++) {
                let span = document.createElement("span");
                span.setAttribute("class", "badge rounded-pill tag tag-color");
                span.innerHTML = blog_tags[j];
                blog_tags_container.appendChild(span);
            }

            let blog_summary_container = document.createElement("h5");
            blog_summary_container.setAttribute("class", "card-text");
            blog_summary_container.innerHTML = blog_summary + " ";

            let read_more_button = document.createElement("a");
            read_more_button.setAttribute("href", "view.html?id=" + blog_id);
            read_more_button.innerHTML = "Read More"
            blog_summary_container.appendChild(read_more_button);


            div4.appendChild(blog_title_container);
            div4.appendChild(blog_author_container);
            div4.appendChild(blog_date_container);
            div4.appendChild(blog_tags_container);
            div4.appendChild(blog_summary_container);

            div3.appendChild(div4);
            div2.appendChild(div3);
            div1.appendChild(div2);

            search_results_container.appendChild(div1);
        }
    });
}