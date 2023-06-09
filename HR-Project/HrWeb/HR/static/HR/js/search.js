class card {
  constructor(n = "", id = "") {
    this._self = this;
    this.name = n;
    this.id = id;
    this.cardStructure = `
    <img src=" /static/HR/images/user-icon.png " alt="" class = "image">
    <div class="text">
      <p> 
        name: ${this.name}
      </p>

      <p>
        ID: ${this.id}
      </p>
    </div>
    <div class="buttons">
      <a href="/submit/" onClick="applay(${this.id})" ><button type="button" class="button">apply vacation form</button></a>
      <a href="/update/" onClick="update(${this.id})" ><button type="button" class="button">update employee data</button></a>
    </div>
    `;
  }
  displayCard() {
    let d = document.createElement("div");
    d.className = "emm";
    d.innerHTML = this.cardStructure;
    let container = document.querySelector(".em");
    container.appendChild(d);
  }
}
applay = function (id) {
  sessionStorage.setItem("id", id);
}
update = function (id) {
  sessionStorage.setItem("updateID", id);
}
let searchButton = document.querySelector("#searchbutton");
let searchinput = document.querySelector("#searchinput");

document.addEventListener("DOMContentLoaded", function () {
  var searchBtn = document.getElementById("searchbutton");
  var searchInput = document.getElementById("searchinput");
  var resultsDiv = document.getElementById("result");

  searchInput.addEventListener("input", function () {
    resultsDiv.innerHTML = "";
    var searchKeyword = searchInput.value;
    if (searchKeyword.length > 0) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "/search-employees/?search=" + encodeURIComponent(searchKeyword) + "&Admin=" + encodeURIComponent(sessionStorage.getItem("admin-username")),
        true
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            let employee;
            for (var i = 0; i < response.length; i++) {
              employee = response[i];
              let ay7aga = new card(employee.name, employee.id);
              ay7aga.displayCard();
            }
          } else {
            console.error("Error:", xhr.status);
          }
        }
      };

      xhr.send();
    }
  });
});
