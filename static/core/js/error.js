const params = new URLSearchParams(window.location.search);
import { ERROR_CODE_DESCRIPTION_MAPPING, NUMBER_OF_ERROR_IMAGES } from "./constants.js";

if (!params) {
    // redirect to home page if no get parameters are passed
    window.location.replace("index.html");
}
else {
    if (!params.has("err_code")) {
        // redirect to home page if "err_code" parameter is not passed
        window.location.replace("index.html");
    }
    else {
        // Error image generation, will generate a random number between 1 and "NUMBER_OF_ERROR_IMAGES"
        let random_error_image_number = Math.floor((Math.random() * NUMBER_OF_ERROR_IMAGES) + 1);
        document.getElementById("error_image").setAttribute("src", "static/core/images/error/error_"+random_error_image_number+".gif")
        const err_code = params.get("err_code");
        document.getElementById("error-code").innerHTML = "Error code: " + err_code;
        if (params.has("status_code")) {
            let status_code = params.get("status_code");
            document.getElementById("error-description").innerHTML = "Error Description: " + ERROR_CODE_DESCRIPTION_MAPPING[err_code] + " Response status encountered: " + status_code;;
        }
        else {
            document.getElementById("error-description").innerHTML = "Error Description: " + ERROR_CODE_DESCRIPTION_MAPPING[err_code];
        }
    }
}