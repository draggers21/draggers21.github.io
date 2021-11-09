// Add a super function that will handle all the calls and will then redirect to the below functions
// This value is same as the one in the static/core/js/constants.js file, change this whenever there 
// is a change in the value of the same in the constants file 
let NUMBER_OF_PAGES_IN_PAGINATION = 4;

/* 
    TODO: Optimize code and clean it. 
*/

function check_next_prev_button() {

    /*
    logic -
    right shift -
        If last page in paginate segment, check if last paginate segment, if yes then disable the button
        if not then - 
            1. Change paginate segment
            2. Change class active of first element of paginate
    */
    let active_paginate_segment = document.getElementsByClassName("this-is-the-active-paginate-segment");
    let paginate_segment_id = active_paginate_segment[0].getAttribute("id");
    let paginate_segment_number = parseInt(active_paginate_segment[0].getAttribute("name").split("_")[2]);
    if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("name") == "page_1") {
        document.getElementById("prev_page_" + paginate_segment_number).setAttribute("class", "disabled");
        if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("id") == "last_page") {
            document.getElementById("next_page_" + paginate_segment_number).setAttribute("class", "disabled");
        }
        else {
            document.getElementById("next_page_" + paginate_segment_number).removeAttribute("class");
        }
    }
    else if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("id") == "last_page") {

        // Logic - check if paginate segment is last segment then disable else do nothing 

        console.log(paginate_segment_id);
        if (paginate_segment_id == "last-paginate-segment") {

            document.getElementById("next_page_" + paginate_segment_number).setAttribute("class", "disabled");
        }
        document.getElementById("prev_page_" + paginate_segment_number).removeAttribute("class");
    }
    else {
        document.getElementById("prev_page_" + paginate_segment_number).removeAttribute("class");
        document.getElementById("next_page_" + paginate_segment_number).removeAttribute("class");
    }
}


function change_page(element_name) {
    //console.log(element_name);
    if (element_name == "left_shift") {
        // getting the current active pagination button
        let active_pages = document.getElementsByClassName("this-is-the-active-page");
        let active_paginate_segment = document.getElementsByClassName("this-is-the-active-paginate-segment");
        let paginate_segment_to_deactive = active_paginate_segment[0].getAttribute("name");
        let paginate_segment_number = parseInt(paginate_segment_to_deactive.split("_")[2]);

        // console.log(active_pages)
        // getting the corresponding page number
        let page_to_deactivate = active_pages[0].getAttribute("name");

        // Logic to deactivate the current paginate segment after checking whether this is the last page in the 
        // paginate segment
        if (active_pages[0].getAttribute("name") == "page_" + ((paginate_segment_number * NUMBER_OF_PAGES_IN_PAGINATION) - (NUMBER_OF_PAGES_IN_PAGINATION - 1)) && active_paginate_segment[0].getAttribute["id"] != "first-paginate-segment") {

            // getting the next paginate segment list
            let next_paginate_segment = "paginate_segement_" + (paginate_segment_number - 1);

            // deactivating the current segment and activating the next segment
            active_paginate_segment[0].removeAttribute("class");
            document.getElementsByName(paginate_segment_to_deactive)[0].style.display = "none";

            document.getElementsByName(next_paginate_segment)[0].setAttribute("class", "this-is-the-active-paginate-segment");
            document.getElementsByName(next_paginate_segment)[0].style.display = "block";
        }

        // changing display to none 
        // document.getElementById(page_to_deactivate).style.display = "none";

        let prev_page = "page_" + (parseInt(page_to_deactivate.split("_")[1]) - 1);
        console.log(prev_page);
        // remove active status
        active_pages[0].removeAttribute("class");
        document.getElementById(page_to_deactivate).style.display = "none";

        // change class of pagintion button
        document.getElementsByName(prev_page)[0].setAttribute("class", "this-is-the-active-page");
        // this will display the div with id page_number
        document.getElementById(prev_page).style.display = "block";
    }
    else if (element_name == "right_shift") {
        // getting the current active pagination button
        let active_pages = document.getElementsByClassName("this-is-the-active-page");
        let active_paginate_segment = document.getElementsByClassName("this-is-the-active-paginate-segment");

        // console.log(active_pages)
        // getting the corresponding page number
        let page_to_deactivate = active_pages[0].getAttribute("name");

        // Logic to deactivate the current paginate segment after checking whether this is the last page in the 
        // paginate segment
        if (active_pages[0].getAttribute("id") == "last_page" && active_paginate_segment[0].getAttribute["id"] != "last-paginate-segment") {

            // getting the next paginate segment list
            let paginate_segment_to_deactive = active_paginate_segment[0].getAttribute("name");
            let next_paginate_segment = "paginate_segement_" + (parseInt(paginate_segment_to_deactive.split("_")[2]) + 1);
            console.log(next_paginate_segment);
            // deactivating the current segment and activating the next segment
            active_paginate_segment[0].removeAttribute("class");
            document.getElementsByName(paginate_segment_to_deactive)[0].style.display = "none";

            document.getElementsByName(next_paginate_segment)[0].setAttribute("class", "this-is-the-active-paginate-segment");
            document.getElementsByName(next_paginate_segment)[0].style.display = "block";
        }

        // changing display to none 
        // document.getElementById(page_to_deactivate).style.display = "none";

        let next_page = "page_" + (parseInt(page_to_deactivate.split("_")[1]) + 1);
        // console.log(next_page);
        // remove active status
        active_pages[0].removeAttribute("class");
        document.getElementById(page_to_deactivate).style.display = "none";

        // change class of pagintion button
        document.getElementsByName(next_page)[0].setAttribute("class", "this-is-the-active-page");
        // this will display the div with id page_number
        document.getElementById(next_page).style.display = "block";
    }
    else if (element_name.includes("page")) {
        // getting the current active pagination button
        let active_pages = document.getElementsByClassName("this-is-the-active-page");
        // console.log(active_pages)

        // getting the corresponding page number
        let page_to_deactivate = active_pages[0].getAttribute("name");

        // changing display to none 
        document.getElementById(page_to_deactivate).style.display = "none";

        // remove active status
        active_pages[0].removeAttribute("class");

        document.getElementsByName(element_name)[0].setAttribute("class", "this-is-the-active-page");
        // this will display the div with id page_number
        document.getElementById(element_name).style.display = "block";

    }
    check_next_prev_button();
}