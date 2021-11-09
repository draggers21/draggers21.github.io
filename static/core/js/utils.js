import { NUMBER_OF_PAGES_IN_PAGINATION } from "./constants.js";

export async function fetch_json_data(meta_data_location) {
    try {
        let response = await fetch(meta_data_location);
        check_response_status(response.status);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function create_blog_cards(blog_id, meta_data) {
    let blog_title = meta_data.blog_title;
    let blog_author = meta_data.blog_author;
    let blog_publish_date = meta_data.blog_publish_date;
    let blog_tags = meta_data.blog_tags;
    let blog_summary = meta_data.blog_summary;
    let blog_read_time = meta_data.read_time;

    let div1 = document.createElement("div");
    div1.setAttribute("class", "row blog_card");

    let div2 = document.createElement("div");
    div2.setAttribute("class", "col");

    let div3 = document.createElement("div");
    div3.setAttribute("class", "card text-justify");

    let div4 = document.createElement("div");
    div4.setAttribute("class", "card-body blog-card");

    let blog_title_container = document.createElement("h4");
    blog_title_container.setAttribute("class", "card-title");
    blog_title_container.innerHTML = "<a href='view.html?id=" + blog_id + "' style='font-style:normal'>" + blog_title + "</a>";

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
        span.innerHTML = '<a href="search.html?query=tags:' + blog_tags[j] + '">' + blog_tags[j] + '</a>';
        blog_tags_container.appendChild(span);
    }

    let blog_read_time_container = document.createElement("p");
    blog_read_time_container.setAttribute("class", "card-text");
    if (blog_read_time == "1") {
        blog_read_time_container.innerHTML = "Read time: " + blog_read_time + " min";
    }
    else {
        blog_read_time_container.innerHTML = "Read time: " + blog_read_time + " mins";
    }

    let blog_summary_container = document.createElement("p");
    blog_summary_container.setAttribute("class", "card-text");
    blog_summary_container.innerHTML = blog_summary + "<br />";

    let read_more_section = document.createElement("p");
    read_more_section.setAttribute("class", "card-text continue-reading");

    let read_more_button = document.createElement("button");
    read_more_button.setAttribute("type", "button");
    read_more_button.setAttribute("class", "btn");


    let read_more_link = document.createElement("a");
    read_more_link.setAttribute("href", "view.html?id=" + blog_id);
    read_more_link.innerHTML = "<strong>Continue Reading</strong>"

    read_more_button.appendChild(read_more_link);
    read_more_section.appendChild(read_more_button);
    // blog_summary_container.appendChild(read_more_section);


    div4.appendChild(blog_title_container);
    div4.appendChild(blog_author_container);
    div4.appendChild(blog_date_container);
    div4.appendChild(blog_tags_container);
    div4.appendChild(blog_read_time_container);
    div4.appendChild(blog_summary_container);
    div4.appendChild(read_more_section);

    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);

    return div1;
}

function create_pagination(page_start, page_end, paginate_segment) {

    // TODO Add paginate segment id in right and left shift buttons
    let empty_div = document.createElement("div");
    let left_shift = document.createElement("a");
    left_shift.setAttribute("href", "#");
    if (paginate_segment == 1) {
        left_shift.setAttribute("class", "disabled");
    }
    left_shift.setAttribute("onclick", "change_page(this.name)");
    left_shift.setAttribute("name", "left_shift");
    left_shift.setAttribute("id", "prev_page_"+paginate_segment);
    left_shift.innerHTML = "&laquo";
    empty_div.appendChild(left_shift);

    for (let i = page_start; i <= page_end; i++) {
        let a_tag = document.createElement("a");
        a_tag.setAttribute("href", "#");
        a_tag.setAttribute("onclick", "change_page(this.name)");
        a_tag.setAttribute("name", "page_" + i);
        a_tag.innerHTML = i;
        if (i == 1) {
            // first and active page in any segment 
            a_tag.setAttribute("class", "this-is-the-active-page");
        }
        if (i == page_end) {
            // Last page in any segment
            a_tag.setAttribute("id", "last_page");
        }
        empty_div.appendChild(a_tag);
    }
    let right_shift = document.createElement("a");
    right_shift.setAttribute("href", "#");
    if (page_start == 1 && page_end == 1) {
        right_shift.setAttribute("class", "disabled");
    }
    right_shift.setAttribute("onclick", "change_page(this.name)");
    right_shift.setAttribute("name", "right_shift");
    right_shift.setAttribute("id", "next_page_"+paginate_segment);
    right_shift.innerHTML = "&raquo;";
    empty_div.appendChild(right_shift);
    return empty_div;
}

export function create_pagination_holder(total_number_of_pages) {
    // this variable will hold the entire pagination html
    let complete_pagination_div = document.createElement("div");
    let total_number_of_pagination_segments = Math.ceil(total_number_of_pages / NUMBER_OF_PAGES_IN_PAGINATION);
    var prev_page_end = 0;
    for (let k = 1; k <= total_number_of_pagination_segments; k++) {
        var page_start = prev_page_end + 1;
        var page_end = k * NUMBER_OF_PAGES_IN_PAGINATION;
        if (page_end > total_number_of_pages) {
            page_end = total_number_of_pages;
        }
        prev_page_end = page_end;

        // Call the above function here with start_page and end_page
        // It will return the html code that will be added here after.
        var inner_pagination_html = create_pagination(page_start, page_end, k);

        var temp_div = document.createElement("div");
        temp_div.setAttribute("name", "paginate_segement_" + k)
        if (page_start == 1) {
            // First paginate segment
            temp_div.setAttribute("class", "this-is-the-active-paginate-segment");
            temp_div.setAttribute("style", "display: block;");
            temp_div.setAttribute("id", "first-paginate-segment");
        } else if (page_end == total_number_of_pages) {
            // last paginate segment
            temp_div.setAttribute("class", "this-is-the-last-paginate-segment");
            temp_div.setAttribute("style", "display: none;");
            temp_div.setAttribute("id", "last-paginate-segment");
        }
        else {
            temp_div.setAttribute("style", "display: none;")
        }
        temp_div.append(inner_pagination_html);
        complete_pagination_div.append(temp_div);
    }

    return complete_pagination_div;
}


export function sanitize_input(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

function check_response_status(status) {
    if (status >= 400 && status < 500) {
        // error code 1504 - refers to all 4xx errors
        window.location.replace("error.html?err_code=1504&status_code=" + status);
    }
    else if (status >= 500) {
        // error code 1505 - refers to all 5xx errors
        window.location.replace("error.html?err_code=1505&status_code=" + status);
    }
    else {
        return;
    }
}