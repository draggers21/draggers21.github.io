const params = new URLSearchParams(window.location.search);
if (!params) {
    // redirect to home page if no get parameters are passed
    window.location.replace("index.html");
}
else {
    if (!params.has("err_code")) {
        // redirect to home page if "id" parameter is not passed
        window.location.replace("index.html");
    }
    else {
        const err_code = params.get("err_code");
        document.getElementById("error-code").innerHTML = "Error code: " + err_code;

        if (err_code == 1501) {
            document.getElementById("error-description").innerHTML = "Error Description: Invalid blog id.";
        }
        else if (err_code == 1502) {
            document.getElementById("error-description").innerHTML = "Error Description: No blog content found for the furnished blog id.";
        }
    }
}