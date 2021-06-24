import { fetch_meta_data } from "./utils.js";
import { DATE_TO_BLOG_ID_MAPPING, TAGS_TO_BLOG_ID_MAPPING } from "./constants.js";


function process_date_meta_data() {
    let meta_data = fetch_meta_data("../../" + DATE_TO_BLOG_ID_MAPPING);
    const date_side_panel = document.getElementById("side-panel-date");
    const h4_title = document.createElement("h4");
    h4_title.innerHTML = "View by date: ";
    date_side_panel.appendChild(h4_title);
    const years = Object.keys(meta_data);
    for(let i=0;i<years.length;i++){
        const months = Object.keys(meta_data[years[i]]);
        for(let j=0; j<months.length; j++) {
            const h5_date_tag = document.createElement("h5");
            const temp_date = months[j]+" "+years[i];
            h5_date_tag.innerHTML = '<a href="search.html?query=date:'+temp_date+'">'+temp_date+'</a>';
            date_side_panel.appendChild(h5_date_tag);
        }

    }
}

function process_tag_meta_data() {
    let meta_data = fetch_meta_data("../../" + TAGS_TO_BLOG_ID_MAPPING);
    const tag_side_panel = document.getElementById("side-panel-tags")
    const h4_title = document.createElement("h4");
    h4_title.innerHTML = "View by tag: ";
    tag_side_panel.appendChild(h4_title);
    const all_tags = Object.keys(meta_data);
    for(let i=0;i<all_tags.length;i++) {
        const span_container = document.createElement("span");
        span_container.setAttribute("class", "badge rounded-pill tag tag-color");
        span_container.innerHTML = '<a href="search.html?tags:'+all_tags[i]+'">'+all_tags[i]+'</a>';
        tag_side_panel.appendChild(span_container);
    }
}

process_date_meta_data();
process_tag_meta_data();
