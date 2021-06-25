/* 
    TODO: Optimize code and clean it. 
*/

function check_next_prev_button() {
    if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("name") == "page_1") {
        document.getElementById("prev_page").setAttribute("class", "disabled");
        if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("id") == "last_page") {
            document.getElementById("next_page").setAttribute("class", "disabled");
        }
        else{
            document.getElementById("next_page").removeAttribute("class");
        }
    }
    else if (document.getElementsByClassName("this-is-the-active-page")[0].getAttribute("id") == "last_page") {
        document.getElementById("next_page").setAttribute("class", "disabled");
        document.getElementById("prev_page").removeAttribute("class");
    }
    else {
        document.getElementById("prev_page").removeAttribute("class");
        document.getElementById("next_page").removeAttribute("class");
    }
}

function change_page(element_name) {
    //console.log(element_name);
    if (element_name == "left_shift") {
        // getting the current active pagination button
        let active_pages = document.getElementsByClassName("this-is-the-active-page");

        // console.log(active_pages)
        // getting the corresponding page number
        let page_to_deactivate = active_pages[0].getAttribute("name");

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

        // console.log(active_pages)
        // getting the corresponding page number
        let page_to_deactivate = active_pages[0].getAttribute("name");

        // changing display to none 
        // document.getElementById(page_to_deactivate).style.display = "none";

        let next_page = "page_" + (parseInt(page_to_deactivate.split("_")[1]) + 1);
        console.log(next_page);
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