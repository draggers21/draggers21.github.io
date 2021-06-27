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
        fetch('static/meta_data/blog_meta_data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                try {
                    // sending specific json data to the processing function
                    process_meta_data(data[blog_id]);
                }
                catch (err) {
                    // try fetching the specific data from the json
                    // if record not found then
                    // redirect to error.html page
                    // error code 1501 - Invalid Blog ID
                    window.location.replace("error.html?err_code=1501");
                    // console.log(err)
                }
            })
            .catch(function (err) {
                console.log("error" + err);
            });

        function process_meta_data(blog_meta_data) {

            // function to fetch and display blog meta data on the page

            const blog_location = blog_meta_data.blog_location;
            const blog_title = blog_meta_data.blog_title;
            const blog_author = blog_meta_data.blog_author;
            const blog_publish_date = blog_meta_data.blog_publish_date;
            const blog_tags = blog_meta_data.blog_tags;

            // console.log(blog_id);
            // console.log(blog_location);
            // console.log(blog_title);
            // console.log(blog_author);
            // console.log(blog_publish_date);
            // console.log(blog_tags);

            document.getElementById("blog-title").innerHTML = blog_title;
            document.getElementById("blog-author-name").innerHTML = "Author: " + blog_author;
            document.getElementById("blog-publish-date").innerHTML = "Date Published: " + blog_publish_date;
            // creating blog tags
            var tag_container = document.getElementById("blog-tags")
            tag_container.innerHTML = "Tags: ";
            for (var i = 0; i < blog_tags.length; i++) {
                var span = document.createElement("span");
                span.setAttribute("class", "badge rounded-pill tag tag-color");
                span.innerHTML = '<a href="search.html?query=tags:' + blog_tags[i] + '">' + blog_tags[i] + '</a>';
                tag_container.appendChild(span);
            }
            fetch_blog_content(blog_location);
        }

        function fetch_blog_content(blog_location) {
            // function to fetch blog content
            fetch(blog_location)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    try {
                        create_blog(data.blog_content);
                    }
                    catch (err) {
                        // try fetching the blog content from the blog location
                        // if record not found then
                        // redirect to error.html page
                        // error code 1502 - No Blog content found
                        window.location.replace("error.html?err_code=1502");
                        // console.log(err)

                    }
                })
                .catch(function (err) {
                    console.log("error" + err);
                });
        }

        function create_blog(blog_content) {
            // function to display blog content on the page
            // console.log(blog_content);
            document.getElementById("blog-content").innerHTML = blog_content;
        }
    }
}