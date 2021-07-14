import { fetch_json_data } from "./utils.js";
import { BLOG_META_DATA_LOCATION } from "./constants.js";


const params = new URLSearchParams(window.location.search);
if (!params) {
    // redirect to home page if no get parameters are passed
    window.location.replace("index.html");
}
else {
    if (!params.has("id")) {
        // redirect to home page if "id" parameter is not passed
        window.location.replace("index.html");
    }
    else {
        const blog_id = params.get("id");
        // removed in prod
        // document.getElementById("blog_id").innerHTML = blog_id;

        // fetching metadata about the blog using blog_id
        fetch_json_data(BLOG_META_DATA_LOCATION).then(function (meta_data) {
            try {
                // sending specific json data to the processing function
                process_meta_data(meta_data[blog_id]);
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

        function process_meta_data(blog_meta_data) {

            // function to fetch and display blog meta data on the page

            const blog_location = blog_meta_data.blog_location;
            const blog_title = blog_meta_data.blog_title;
            const blog_summary = blog_meta_data.blog_summary;
            // Changing document title and description
            document.title = blog_title + " | Draggers21";

            // Changing meta description
            let current_meta_description_content = document.querySelector('meta[name="Description"]').getAttribute("content");
            document.querySelector('meta[name="Description"]').setAttribute("content", blog_summary + " | " + current_meta_description_content);

            const blog_author = blog_meta_data.blog_author;
            const blog_publish_date = blog_meta_data.blog_publish_date;
            const blog_tags = blog_meta_data.blog_tags;


            document.getElementById("blog-title").innerHTML = blog_title;
            document.getElementById("blog-author-name").innerHTML = "Author: <strong>" + blog_author + "</strong>";
            document.getElementById("blog-publish-date").innerHTML = "Date Published: <strong>" + blog_publish_date + "</strong>";
            // creating blog tags
            var tag_container = document.getElementById("blog-tags")
            tag_container.innerHTML = "Tags: ";
            for (var i = 0; i < blog_tags.length; i++) {
                var span = document.createElement("span");
                span.setAttribute("class", "badge rounded-pill tag tag-color");
                span.innerHTML = '<a href="search.html?query=tags:' + blog_tags[i] + '">' + blog_tags[i] + '</a>';
                tag_container.appendChild(span);
            }

            try {
                var prev_post = blog_meta_data.prev_post;
            }
            catch (error) {
                var prev_post = "";
            }
            try {
                var next_post = blog_meta_data.next_post;
            }
            catch (error) {
                var next_post = "";
            }

            let prev_next_section = create_previous_next_section(prev_post, next_post);
            fetch_blog_content(blog_location, prev_next_section);
        }

        function generate_prev_post(prev_post) {
            if (prev_post == "") {
                return "<div class='col'></div>";
            }
            else {
                try {
                    var prev_post_url = prev_post.url;
                    if (prev_post_url == "" || prev_post_url == null) {
                        return "<div class='col'></div>";
                    }
                }
                catch (err) {
                    return "<div class='col'></div>";
                }
                try {
                    var prev_post_text = prev_post.text;
                }
                catch (err) {
                    var prev_post_text = prev_post_url
                }

                return "<div class='col prev-post'><button type='button' class='btn' onclick='window.open(\"" + prev_post_url + "\")' aria-label='Previous Post' title='" + prev_post_text + "'><strong>&laquo;  Previous Post</strong></button></div>";
            }
        }

        function generate_next_post(next_post) {
            if (next_post == "") {
                return "<div class='col'></div>";
            }
            else {
                try {
                    var next_post_url = next_post.url;
                    if (next_post_url == "" || next_post_url == null) {
                        return "<div class='col'></div>";
                    }
                }
                catch (err) {
                    return "<div class='col'></div>";
                }
                try {
                    var next_post_text = next_post.text;
                }
                catch (err) {
                    var next_post_text = next_post_url
                }

                return "<div class='col next-post'><button type='button' class='btn' onclick='window.open(\"" + next_post_url + "\")' aria-label='Next Post' title='" + next_post_text + "'><strong>Next Post  &raquo;</strong></button></div>";
            }
        }


        function create_previous_next_section(prev_post, next_post) {
            let prev_next_section = "<div class='row'>"
            prev_next_section += generate_prev_post(prev_post);
            prev_next_section += generate_next_post(next_post);
            prev_next_section += "</div>"
            return prev_next_section
        }

        function fetch_blog_content(blog_location, prev_next_section) {
            // function to fetch blog content
            fetch_json_data(blog_location).then(function (data) {
                try {
                    create_blog(data.blog_content, prev_next_section);
                }
                catch (err) {
                    // try fetching the blog content from the blog location
                    // if record not found then
                    // redirect to error.html page
                    // error code 1502 - No Blog content found
                    window.location.replace("error.html?err_code=1502");
                    // console.log(err)

                }
            });
        }

        function create_blog(blog_content, prev_next_section) {
            // function to display blog content on the page
            // console.log(blog_content);
            document.getElementById("blog-content").innerHTML = blog_content + "<br /><br /><br /><br />" + prev_next_section;
        }
    }
}