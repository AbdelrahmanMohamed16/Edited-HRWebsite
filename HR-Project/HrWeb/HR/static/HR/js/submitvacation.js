class message {
  constructor(t = "", b = "", n = "") {
    this.name = n;
    this.text = t;
    this.buttonText = b;
    this.messageStructure = `
      <div class="message-container">
        <p>${this.text}</p>
        <button onclick="close_message(this.parentNode.parentNode)">${this.buttonText}</button>
      </div>
    `;
  }
  displayMessage() {
    let d = document.createElement("div");
    d.className = "message";
    d.setAttribute("id", this.name);
    d.innerHTML = this.messageStructure;
    document.forms[0].after(d);
    // document.write(this.messageStructure);
  }
}

let close_message = function (object) {
  object.remove();
};
let formErrorMessage = new message(
  "invalid data, please insure that you inserted correct data.",
  "ok",
  "form-error"
);
let userID = document.forms[0].querySelector(`#input-id`);
userID.value = sessionStorage.getItem("id");
let vacationReason = document.forms[0].querySelector(`#input-reason`);
let vacationFromDate = document.forms[0].querySelector(`#input-from-data`);
let vacationToDate = document.forms[0].querySelector(`#input-to-data`);
userID.onblur = function () {
  if (
    userID.value != "" &&
    userID.value.match("[0-9]") &&
    userID.value.length <= 14
  ) {
    userID.removeAttribute("style");
  }
};
userExist = function (e) {
  let lastID = localStorage.getItem("lastID");
  for (let i = 1; i < lastID; i++) {
    let name = localStorage.getItem(`userID ${i}`);
    console.log(name);
    if (e == name) {
      return true;
    }
  }
  return false;
};
let fromDate;
let toDate;
let validID;
document.forms[0].onsubmit = function (ele) {
  toDate = vacationToDate.value;
  fromDate = vacationFromDate.value;
  toDateArray = new Date(toDate);
  fromDateArray = new Date(fromDate);
  validID = false;
  validDates = false;
  if (
    userID.value != "" &&
    userID.value.length <= 14
    //userExist(userID.value)
  ) {
    validID = true;
  } else {
    userID.style.cssText = "border: 1px solid red;";
  }

  if (fromDateArray < toDateArray) {
    validDates = true;
  } else {
    vacationToDate.style.cssText = "border: 1px solid red;";
    vacationFromDate.style.cssText = "border: 1px solid red;";
  }
  if (validID === false || validDates === false) {
    ele.preventDefault();
    formErrorMessage.displayMessage();
  } else {
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("vac_add");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validID || !validDates) {
      console.log("hello");
      event.preventDefault();
      formErrorMessage.displayMessage();
    } else {
      let formData = new FormData(form);
      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.responseText);
          // Handle the response data
          if (response.message === "employee added successfully") {
            alert(response.message);
            form.reset();
          } else {
            alert(response.message);
          }
        }
      };

      xhttp.open("POST", "/add_vac/", true);
      xhttp.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
      xhttp.send(JSON.stringify({"id" : userID.value, "reason" : vacationReason.value, "from" : vacationFromDate.value, "to" : vacationToDate.value}));
    }
  });
});
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
