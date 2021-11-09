import { fetch_json_data, create_pagination_holder } from "./utils.js";
import { AUTHOR_DETAILS_LOCATION, CARD_PER_PAGE_LIMIT } from "./constants.js";


function about_us_driver() {
    fetch_json_data(AUTHOR_DETAILS_LOCATION).then(function (author_data) {
        try {
            // sending specific json data to the processing function
            process_author_data(author_data);
        }
        catch (err) {
            // try fetching the specific data from the json
            // if record not found then
            // redirect to error.html page
            // error code 1506 - Incorrect JSON file structure
            window.location.replace("error.html?err_code=1506");
            // console.log(err)
        }
    });
}

function process_author_data(author_data) {
    let blog_card_holder_container = document.getElementById("blog-card-holder");
    const number_of_authors = author_data.length;

    let number_of_pages = Math.ceil(number_of_authors / CARD_PER_PAGE_LIMIT);

    for (let i = 1; i <= number_of_pages; i++) {
        let page_div = document.createElement("div");
        page_div.setAttribute("id", "page_" + (i));
        if (i == 1) {
            page_div.setAttribute("style", "display: block;");
        }
        else {
            page_div.setAttribute("style", "display: none;");
        }

        let temp_author_arr = author_data.slice(((i - 1) * CARD_PER_PAGE_LIMIT), (i * CARD_PER_PAGE_LIMIT));
        for (let j = 0; j < temp_author_arr.length; j++) {
            // author data card starts
            // Author name
            try {
                var author_name = temp_author_arr[j].name;
            }
            catch (err) {
                // If no author name then move onto next
                continue;
            }
            // Author summary
            try {
                var author_summary = temp_author_arr[j].summary;
            }
            catch (err) {
                var author_summary = "";
            }
            // github
            try {
                var github_account = temp_author_arr[j].github;
            }
            catch (err) {
                var github_account = "";
            }
            // linkedin
            try {
                var linkedin_account = temp_author_arr[j].linkedin;
            }
            catch (err) {
                var linkedin_account = "";
            }
            // twitter
            try {
                var twitter_account = temp_author_arr[j].twitter;
            }
            catch (err) {
                var twitter_account = "";
            }
            // Instagram
            try {
                var instagram_account = temp_author_arr[j].instagram;
            }
            catch (err) {

                var instagram_account = "";
            }
            // Personal website
            try {
                var personal_website = temp_author_arr[j].personal_website;
            }
            catch (err) {
                var personal_website = "";
            }
            // Author resume
            try {
                var author_resume = temp_author_arr[j].resume;
            }
            catch (err) {
                var author_resume = "";
            }
            // Author picture
            try {
                var author_picture = temp_author_arr[j].picture;
            }
            catch (err) {
                var author_picture = "";
            }

            let div1 = document.createElement("div");
            div1.setAttribute("class", "row blog_card");

            let div2 = document.createElement("div");
            div2.setAttribute("class", "col");

            let div3 = document.createElement("div");
            div3.setAttribute("class", "card text-justify");

            let div4 = document.createElement("div");
            div4.setAttribute("class", "card-body blog-card");

            let div5 = document.createElement("div");
            div5.setAttribute("class", "row container-fluid");

            let div6 = document.createElement("div");
            div6.setAttribute("class", "col-lg-8 about-author-cols");
            div6.setAttribute("style", "margin-bottom: 5px");

            let author_name_element = document.createElement("h3");
            author_name_element.setAttribute("class", "card-title");
            author_name_element.innerHTML = author_name;

            let author_summary_element = document.createElement("p");
            author_summary_element.setAttribute("class", "card-text");
            author_summary_element.innerHTML = author_summary + " Feel free to ping me on any of my socials below. :)<br />";

            let author_socials = document.createElement("p");
            author_socials.setAttribute("class", "card-text");
            author_socials.setAttribute("style", "text-align: center;");

            let author_socials_row = document.createElement("div");
            author_socials_row.setAttribute("class", "row container-fluid");

            if (github_account != "" && github_account != undefined) {
                let github_account_element = document.createElement("div");
                github_account_element.setAttribute("class", "col-sm author-social");
                github_account_element.innerHTML = "<a href='" + github_account + "' target='_blank' rel='noopener'><i class='fab fa-github' title='Open author's Github'></i></a>";
                author_socials_row.appendChild(github_account_element);
            } else {
                let github_account_element = document.createElement("div");
                github_account_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(github_account_element);
            }
            if (linkedin_account != "" && linkedin_account != undefined) {
                let linkedin_account_element = document.createElement("div");
                linkedin_account_element.setAttribute("class", "col-sm author-social");
                linkedin_account_element.innerHTML = "<a href='" + linkedin_account + "' target='_blank' rel='noopener'><i class='fab fa-linkedin' title='Open author's Linkedin'></i></a>";
                author_socials_row.appendChild(linkedin_account_element);
            } else {
                let linkedin_account_element = document.createElement("div");
                linkedin_account_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(linkedin_account_element);
            }
            if (twitter_account != "" && twitter_account != undefined) {
                let twitter_account_element = document.createElement("div");
                twitter_account_element.setAttribute("class", "col-sm author-social");
                twitter_account_element.innerHTML = "<a href='" + twitter_account + "' target='_blank' rel='noopener'><i class='fab fa-twitter' title='Open author's Twitter'></i></a>";
                author_socials_row.appendChild(twitter_account_element);
            } else {
                let twitter_account_element = document.createElement("div");
                twitter_account_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(twitter_account_element);
            }
            if (instagram_account != "" && instagram_account != undefined) {
                let instagram_account_element = document.createElement("div");
                instagram_account_element.setAttribute("class", "col-sm author-social");
                instagram_account_element.innerHTML = "<a href='" + instagram_account + "' target='_blank' rel='noopener'><i class='fab fa-instagram' title='Open author's Instagram'></i></a>";
                author_socials_row.appendChild(instagram_account_element);
            } else {
                let instagram_account_element = document.createElement("div");
                instagram_account_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(instagram_account_element);
            }
            if (personal_website != "" && personal_website != undefined) {
                let personal_website_element = document.createElement("div");
                personal_website_element.setAttribute("class", "col-sm author-social");
                personal_website_element.innerHTML = "<a href='" + personal_website + "' target='_blank' rel='noopener'><i class='fas fa-external-link-alt' title='View author's website'></i></a>";
                author_socials_row.appendChild(personal_website_element);
            } else {
                let personal_website_element = document.createElement("div");
                personal_website_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(personal_website_element);
            }
            if (author_resume != "" && author_resume != undefined) {
                let author_resume_element = document.createElement("div");
                author_resume_element.setAttribute("class", "col-sm author-social");
                author_resume_element.innerHTML = "<a href='" + author_resume + "' target='_blank' rel='noopener'><i class='far fa-file-alt' title='View author's resume'></i></a>";
                author_socials_row.appendChild(author_resume_element);
            } else {
                let author_resume_element = document.createElement("div");
                author_resume_element.setAttribute("class", "col-sm author-social");
                author_socials_row.appendChild(author_resume_element);
            }

            author_socials.appendChild(author_socials_row);
            div6.appendChild(author_name_element);
            div6.appendChild(author_summary_element);
            div6.appendChild(author_socials);

            if (author_picture != "" && author_picture != undefined) {
                let div7 = document.createElement("div");
                div7.setAttribute("class", "col-lg-4 about-author-cols");
                div7.setAttribute("style", "margin-top: 5px");
                div7.innerHTML = "<img src='" + author_picture + "' class='img-fluid about-author-img'>";

                div5.appendChild(div6);
                div5.appendChild(div7);
            } else {
                div5.appendChild(div6);
            }

            div4.appendChild(div5);
            div3.appendChild(div4);
            div2.appendChild(div3);
            div1.appendChild(div2);

            // author data card ends
            page_div.appendChild(div1);
        }
        blog_card_holder_container.appendChild(page_div);
    }
    let pagination = create_pagination_holder(number_of_pages);
    document.getElementById("pagination").appendChild(pagination);
}

about_us_driver()
