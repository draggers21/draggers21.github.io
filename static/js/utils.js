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

    return div1;
}