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
    blog_card_holder_container = document.getElementById("blog-card-holder");
    const blog_ids = Object.keys(meta_data);
    blog_ids.reverse();

    for (var i = 0; i < blog_ids.length; i++) {

        const blog_id = blog_ids[i];
        const blog_title = meta_data[blog_id].blog_title;
        const blog_author = meta_data[blog_id].blog_author;
        const blog_publish_date = meta_data[blog_id].blog_publish_date;
        const blog_tags = meta_data[blog_id].blog_tags;
        const blog_summary = meta_data[blog_id].blog_summary;

        var div1 = document.createElement("div");
        div1.setAttribute("class", "row blog_card");

        var div2 = document.createElement("div");
        div2.setAttribute("class", "col");

        var div3 = document.createElement("div");
        div3.setAttribute("class", "card text-justify");

        var div4 = document.createElement("div");
        div4.setAttribute("class", "card-body blog-card");

        var blog_title_container = document.createElement("h3");
        blog_title_container.setAttribute("class", "card-title");
        blog_title_container.innerHTML = blog_title;

        var blog_author_container = document.createElement("p");
        blog_author_container.setAttribute("class", "card-text");
        blog_author_container.innerHTML = "Author: " + blog_author;

        var blog_date_container = document.createElement("p");
        blog_date_container.setAttribute("class", "card-text");
        blog_date_container.innerHTML = "Date Published: " + blog_publish_date;

        var blog_tags_container = document.createElement("p");
        blog_tags_container.setAttribute("class", "card-text");
        blog_tags_container.innerHTML = "Tags: ";
        for (var j = 0; j < blog_tags.length; j++) {
            var span = document.createElement("span");
            span.setAttribute("class", "badge rounded-pill tag tag-color");
            span.innerHTML = blog_tags[j];
            blog_tags_container.appendChild(span);
        }

        var blog_summary_container = document.createElement("h5");
        blog_summary_container.setAttribute("class", "card-text");
        blog_summary_container.innerHTML = blog_summary + " ";

        var read_more_button = document.createElement("a");
        read_more_button.setAttribute("href", "view.html?id=" + blog_id);
        read_more_button.innerHTML = "Read More"
        blog_summary_container.append(read_more_button);


        div4.append(blog_title_container);
        div4.append(blog_author_container);
        div4.append(blog_date_container);
        div4.append(blog_tags_container);
        div4.append(blog_summary_container);

        div3.append(div4);
        div2.append(div3);
        div1.append(div2);

        blog_card_holder_container.append(div1);
    }
}
