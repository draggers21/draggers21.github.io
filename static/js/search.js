import "constants.js";

/* const params = new URLSearchParams(window.location.search);
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
        document.getElementById("search-query").innerHTML = "Search query: " + raw_query;

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
} */

function parse_filters(query_arr) {
    const filter_name = query_arr[0];
    const search_param = query_arr[1];

    console.log(filter_name);
    if (filter_name == "author") {
        const all_blog_ids = search_author(search_string = search_param);

    }
    else if (filter_name == "title") {
        const all_blog_ids = search_title(search_string = search_param);
    }
    else if (filter_name == "tags") {
        const all_blog_ids = search_tags(search_string = search_param);
    }

    display_content(all_blog_ids);
}


function search_title(search_string) {
    let pattern = new RegExp(search_string, "gim");
    let meta_data_location = "static/meta_data/blog_meta_data.json";
    let meta_data = fetch_meta_data(meta_data_location);
}

function search_author(search_string) {
    let pattern = new RegExp(search_string, "gim");
    let meta_data_location = "static/meta_data/author_blog_id_mapping.json";
    let meta_data = fetch_meta_data(meta_data_location);
    let all_authors = Object.keys(meta_data);
    let all_related_blog_ids = [];
    for (let i = 0; i < all_authors.length; i++) {
        if (search_string.toLowerCase() in all_authors[i].toLowerCase()) {
            for (id in meta_data[all_authors[i]]) {
                all_related_blog_id.append(id);
            }
        }
    }
    return all_related_blog_ids;
}

// console.log(search_tags("Tag1"));

function search_tags(search_string) {
    let pattern = new RegExp(search_string, "gim");
    let meta_data_location = "static/meta_data/tags_blog_id_mapping.json";
    let meta_data = fetch_meta_data(meta_data_location);
    console.log(meta_data);
    let all_tags = Object.keys(meta_data);
    let all_related_blog_ids = [];
    for (let i = 0; i < all_tags.length; i++) {
        if (search_string.toLowerCase() in all_tags[i].toLowerCase()) {
            for (id in meta_data[all_tags[i]]) {
                all_related_blog_id.append(id);
            }
        }
    }
    return all_related_blog_ids;
}

function display_content(blog_ids) {
    let meta_data_location = "static/meta_data/blog_meta_data.json";
    let meta_data = fetch_meta_data(meta_data_location);
    for (let i = 0; i < blog_ids.length; i++) {
        blog_meta_data = meta_data[blog_ids[i]];
    }
}