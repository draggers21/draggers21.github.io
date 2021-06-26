const params = new URLSearchParams(window.location.search);
import { ERROR_CODE_DESCRIPTION_MAPPING } from "./constants.js";

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
        const err_code = params.get("err_code");
        document.getElementById("error-code").innerHTML = "Error code: " + err_code;
        document.getElementById("error-description").innerHTML = "Error Description: "+ERROR_CODE_DESCRIPTION_MAPPING[err_code];
    }
}