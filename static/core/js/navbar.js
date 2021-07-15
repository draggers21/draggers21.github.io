/* <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #192734;">
  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html" style="color: #ffffff; font-weight: bold;"><h3>Home</h3></a>
        </li>
      </ul>
      <form class="d-flex" action="search.html" method="GET" style="margin-top: 15px;">
        <input class="form-control me-2" name="query" type="search" placeholder="Search" aria-label="Search" style="background-color: #1d1c1c;color: #ffffff;">
          <button class="btn btn-outline-success" type="submit" style="background-color: #00897B; color: #ffffff; font-weight: 900;">Search</button>
    </form>
  </div>
    </div>
</nav> */

let nav = document.createElement("nav");
nav.setAttribute("class", "navbar navbar-expand-lg navbar-dark");
nav.setAttribute("style", "background-color: none;");

let div1 = document.createElement("div");
div1.setAttribute("class", "container-fluid");

let brand_a = document.createElement("a");
brand_a.setAttribute("class", "navbar-brand");
brand_a.setAttribute("href", "index.html");
brand_a.setAttribute("style", "margin-left: 10px");
brand_a.innerHTML = "<h3 style='color:#ffffff;'>Home</h3>";
div1.appendChild(brand_a);

let button1 = document.createElement("button");
button1.setAttribute("class", "navbar-toggler");
button1.setAttribute("type", "button");
button1.setAttribute("data-bs-toggle", "collapse");
button1.setAttribute("data-bs-target", "#navbarTogglerDemo02");
button1.setAttribute("aria-controls", "navbarTogglerDemo02");
button1.setAttribute("aria-expanded", "false");
button1.setAttribute("aria-label", "Toggle navigation");
button1.setAttribute("color", "#ffffff");

let span1 = document.createElement("span");
span1.setAttribute("class", "navbar-toggler-icon");

button1.appendChild(span1);

div1.appendChild(button1)

let div2 = document.createElement("div");
div2.setAttribute("class", "collapse navbar-collapse");
div2.setAttribute("id", "navbarTogglerDemo02");

let ul = document.createElement("ul");
ul.setAttribute("class", "navbar-nav me-auto mb-2 mb-lg-0");

let li1 = document.createElement("li");
li1.innerHTML = "<a href='archives.html' style='margin-left: 10px;margin-top:10px;font-style:normal;font-size:large;font-weight:500'>Archives</a>";
li1.setAttribute("class", "nav-item");

/*
let a1 = document.createElement("a");
a1.setAttribute("class", "nav-link active");
a1.setAttribute("aria-current", "page");
a1.setAttribute("href", "index.html");
a1.setAttribute("style", "color: #ffffff; font-weight: bold;");
a1.innerHTML = "<h4>Home</h4>";

li1.appendChild(a1);
*/
ul.appendChild(li1);

div2.appendChild(ul);

let form = document.createElement("form");
form.setAttribute("class", "d-flex");
form.setAttribute("action", "search.html");
form.setAttribute("method", "GET");
form.setAttribute("style", "margin-top: 10px;");
form.setAttribute("style", "margin-bottom: 5px;");

let input1 = document.createElement("input");
input1.setAttribute("class", "form-control me-2");
input1.setAttribute("name", "query");
input1.setAttribute("type", "search");
input1.setAttribute("placeholder", "Search");
input1.setAttribute("aria-label", "Search");
input1.setAttribute("style", "background-color: #ffffff; color: #000000; font-weight: 900");

form.appendChild(input1);

let form_button = document.createElement("button");
form_button.setAttribute("class", "btn btn-outline-success tag-color");
form_button.setAttribute("type", "submit");
form_button.setAttribute("style", "color: #ffffff; font-weight: 900;");
form_button.innerHTML = "Search";

form.appendChild(form_button);

div2.appendChild(form);
div1.appendChild(div2);
nav.appendChild(div1);

document.getElementById("navigation-bar").appendChild(nav);
