import { fetch_json_data, create_blog_cards, create_pagination, sanitize_input } from "./utils.js";
import { BLOG_META_DATA_LOCATION, AUTHOR_BLOG_ID_MAPPING, DATE_TO_BLOG_ID_MAPPING, TAGS_TO_BLOG_ID_MAPPING, CARD_PER_PAGE_LIMIT } from "./constants.js";

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
        const raw_query = sanitize_input(params.get("query"));

        // add query to dom
        document.getElementById("search-query").innerHTML = "Search query:&emsp;'&nbsp;" + raw_query + "&nbsp;'";

        if (raw_query.includes(":")) {
            // this code block is when there are filters
            const query_arr = raw_query.split(":");
            parse_filters(query_arr);
        }
        else if (!raw_query == "") {
            // search in title by default
            search_title(raw_query);
        }
        else {
            // error code 1503 is invalid search string
            window.location.replace("error.html?err_code=1503");
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
    else if (filter_name == "content") {
        search_content(search_param);
    }
    else if (filter_name == "summary") {
        search_summary(search_param);
    }
}

function regex_match(string_to_search, string_to_search_in) {
    let pattern = new RegExp(string_to_search, "gim");
    return pattern.test(string_to_search_in);
}

function display_search_result_count(blog_ids_length) {
    console.log(blog_ids_length)
    if (blog_ids_length == 0) {
        document.getElementById("search-help").style.display = "block";
    }
    document.getElementById("search-query-count").innerHTML = "Your search query fetched " + blog_ids_length + " result(s)";
}

// revisit
function search_content(search_string) {
    fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        let all_blog_ids = Object.keys(meta_data);
        let all_related_blog_ids = [];
        for (let i = 0; i < all_blog_ids.length; i++) {
            let blog_id = all_blog_ids[i];
            let blog_location = "../../../" + meta_data[blog_id].blog_location;
            fetch_json_data(blog_location).then(function (blog_content_json) {
                let blg_content = blog_content_json.blog_content;
                if (regex_match(search_string.toLowerCase(), blg_content.toLowerCase())) {
                    all_related_blog_ids.push(blog_id);
                }
            });
        }
        //console.log(all_related_blog_ids);
        display_search_result_count(all_related_blog_ids.length);
        display_content(all_related_blog_ids);
    });
}

// done
function search_summary(search_string) {
    fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        let all_blog_ids = Object.keys(meta_data);
        let all_related_blog_ids = [];
        for (let i = 0; i < all_blog_ids.length; i++) {
            let blog_id = all_blog_ids[i];
            let blog_summary = meta_data[blog_id].blog_summary;
            if (regex_match(search_string.toLowerCase(), blog_summary.toLowerCase())) {
                all_related_blog_ids.push(blog_id);
            }
        }
        //console.log(all_related_blog_ids);
        display_search_result_count(all_related_blog_ids.length);
        display_content(all_related_blog_ids);
    });
}

// done
function search_title(search_string) {
    fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        let all_blog_ids = Object.keys(meta_data);
        let all_related_blog_ids = [];
        for (let i = 0; i < all_blog_ids.length; i++) {
            let blog_id = all_blog_ids[i];
            let blog_title = meta_data[blog_id].blog_title;
            if (regex_match(search_string.toLowerCase(), blog_title.toLowerCase())) {
                all_related_blog_ids.push(blog_id);
            }
        }
        // console.log(all_related_blog_ids);
        display_search_result_count(all_related_blog_ids.length);
        display_content(all_related_blog_ids);
    });
}

// done
function search_author(search_string) {
    fetch_json_data(AUTHOR_BLOG_ID_MAPPING).then(function (meta_data) {
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
        display_search_result_count(all_related_blog_ids.length);
        display_content(all_related_blog_ids);
    });
}

// done
function search_tags(search_string) {
    fetch_json_data(TAGS_TO_BLOG_ID_MAPPING).then(function (meta_data) {
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
        display_search_result_count(all_related_blog_ids.length);
        display_content(all_related_blog_ids);
    });
}

// done
function search_date(search_string) {
    fetch_json_data(DATE_TO_BLOG_ID_MAPPING).then(function (meta_data) {
        let month = search_string.split(" ")[0];
        let year = search_string.split(" ")[1];
        display_search_result_count(meta_data[year][month].length);
        display_content(meta_data[year][month]);
    });
}


function display_content(blog_ids) {
    fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
        blog_ids.reverse();
        let search_results_container = document.getElementById("search-results");

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
            search_results_container.appendChild(page_div);
        }

        let pagination = create_pagination(number_of_pages);
        document.getElementById("pagination").appendChild(pagination);

    });
}