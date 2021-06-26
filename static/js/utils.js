export async function fetch_json_data(meta_data_location) {
    try {
        let response = await fetch(meta_data_location);
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
        span.innerHTML = '<a href="search.html?query=tags:' + blog_tags[j] + '">' + blog_tags[j] + '</a>';
        blog_tags_container.appendChild(span);
    }

    let blog_summary_container = document.createElement("h5");
    blog_summary_container.setAttribute("class", "card-text");
    blog_summary_container.innerHTML = blog_summary + " ";

    let read_more_button = document.createElement("a");
    read_more_button.setAttribute("href", "view.html?id=" + blog_id);
    read_more_button.innerHTML = "...Continue Reading"
    blog_summary_container.appendChild(read_more_button);


    div4.appendChild(blog_title_container);
    div4.appendChild(blog_author_container);
    div4.appendChild(blog_date_container);
    div4.appendChild(blog_tags_container);
    div4.appendChild(blog_summary_container);

    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);

    return div1;
}

export function create_pagination(number_of_pages) {

    let empty_div = document.createElement("div");
    empty_div.setAttribute("class", "row");
    let col = document.createElement("div");
    col.setAttribute("class", "col");
    let left_shift = document.createElement("a");
    left_shift.setAttribute("href", "#");
    left_shift.setAttribute("class", "disabled");
    left_shift.setAttribute("onclick", "change_page(this.name)");
    left_shift.setAttribute("name", "left_shift");
    left_shift.setAttribute("id", "prev_page");
    left_shift.innerHTML = "&laquo";
    col.appendChild(left_shift);

    for (let i = 1; i <= number_of_pages; i++) {
        let a_tag = document.createElement("a");
        a_tag.setAttribute("href", "#");
        a_tag.setAttribute("onclick", "change_page(this.name)");
        a_tag.setAttribute("name", "page_" + i);
        a_tag.innerHTML = i;
        if (i == 1) {
            a_tag.setAttribute("class", "this-is-the-active-page");
        }
        if (i == number_of_pages) {
            a_tag.setAttribute("id", "last_page");
        }
        col.appendChild(a_tag);
    }
    let right_shift = document.createElement("a");
    right_shift.setAttribute("href", "#");
    if (number_of_pages == 1) {
        right_shift.setAttribute("class", "disabled");
    }
    right_shift.setAttribute("onclick", "change_page(this.name)");
    right_shift.setAttribute("name", "right_shift");
    right_shift.setAttribute("id", "next_page");
    right_shift.innerHTML = "&raquo;";
    col.appendChild(right_shift);
    empty_div.appendChild(col);
    return empty_div;
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
    return string.replace(reg, (match)=>(map[match]));
  }
