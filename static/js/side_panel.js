import { fetch_json_data, capitalizeFirstLetter } from "./utils.js";
import { DATE_TO_BLOG_ID_MAPPING, TAGS_TO_BLOG_ID_MAPPING, AUTHOR_BLOG_ID_MAPPING } from "./constants.js";

function process_date_meta_data() {
    fetch_json_data(DATE_TO_BLOG_ID_MAPPING).then(function (meta_data) {
        const date_side_panel = document.getElementById("side-panel-date");
        const h4_title = document.createElement("h4");
        h4_title.innerHTML = "View by date: ";
        date_side_panel.appendChild(h4_title);
        const years = Object.keys(meta_data);
        for (let i = 0; i < years.length; i++) {
            const months = Object.keys(meta_data[years[i]]);
            for (let j = 0; j < months.length; j++) {
                const h5_date_tag = document.createElement("h5");
                const temp_date = months[j] + " " + years[i];
                h5_date_tag.innerHTML = '<a href="search.html?query=date:' + temp_date + '">' + capitalizeFirstLetter(temp_date) + '</a>';
                date_side_panel.appendChild(h5_date_tag);
            }

        }
    });
}

function process_tag_meta_data() {
    fetch_json_data("../../" + TAGS_TO_BLOG_ID_MAPPING).then(function (meta_data) {
        const tag_side_panel = document.getElementById("side-panel-tags")
        const h4_title = document.createElement("h4");
        h4_title.innerHTML = "Search by tag: ";
        tag_side_panel.appendChild(h4_title);
        const all_tags = Object.keys(meta_data);
        for (let i = 0; i < all_tags.length; i++) {
            const span_container = document.createElement("span");
            span_container.setAttribute("class", "badge rounded-pill tag tag-color");
            span_container.innerHTML = '<a href="search.html?query=tags:' + all_tags[i] + '">' + all_tags[i] + '</a>';
            tag_side_panel.appendChild(span_container);
        }
    });
}

function process_author_meta_data() {
    fetch_json_data("../../" + AUTHOR_BLOG_ID_MAPPING).then(function (meta_data) {
        const author_side_panel = document.getElementById("side-panel-authors")
        const h4_title = document.createElement("h4");
        h4_title.innerHTML = "Search by author: ";
        author_side_panel.appendChild(h4_title);
        const all_author = Object.keys(meta_data);
        for (let i = 0; i < all_author.length; i++) {
            const span_container = document.createElement("span");
            span_container.setAttribute("class", "badge rounded-pill tag tag-color");
            span_container.innerHTML = '<a href="search.html?query=author:' + all_author[i] + '">' + all_author[i] + '</a>';
            author_side_panel.appendChild(span_container);
        }
    });
}

process_date_meta_data();
process_tag_meta_data();
process_author_meta_data();
