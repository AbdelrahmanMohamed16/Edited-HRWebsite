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
let section = document.querySelector(".second-section");
let close_message = function (object) {
  object.remove();
};
let formErrorMessage = new message(
  "invalid data, please insure that you inserted correct data.",
  "ok",
  "form-error"
);
let userName = document.forms[0].querySelector("#name-input");
let userEmail = document.forms[0].querySelector("#email-input");
let userID = document.forms[0].querySelector("#id-input");
let userAddress = document.forms[0].querySelector("#address-input");
let userPhoneNumber = document.forms[0].querySelector("#phone-input");
let userApprovedVacations =
  document.forms[0].querySelector("#approved-vacation");
let userAvailableVacations = document.forms[0].querySelector(
  "#available-vacation"
);
let userSalary = document.forms[0].querySelector("#salary-input");
let userDateofBirth = document.forms[0].querySelector("#dob-input");
let userGender = document.forms[0].querySelector('#gender-input');
let userMartialStatues = document.forms[0].querySelector(
  "#martial-status-input"
);
let lastID = localStorage.getItem("lastID") || 1;
let message_button = document.forms[0].querySelector("#close-message");
userName.onblur = function () {
  if (
    userName.value != "" &&
    userName.value.length > 2 &&
    userName.value.match("[A-Za-z]+")
  ) {
    userName.removeAttribute("style");
  }
};
userID.onblur = function () {
  if (
    userID.value != "" &&
    userID.value.match("[0-9]") &&
    userID.value.length <= 14
  ) {
    userID.removeAttribute("style");
  }
};
userEmail.onblur = function () {
  if (userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")) {
    userEmail.removeAttribute("style");
  }
};
userAddress.onblur = function () {
  if (userAddress.value != "") {
    userAddress.removeAttribute("style");
  }
};
userPhoneNumber.onblur = function () {
  if (userPhoneNumber.value != "" && userPhoneNumber.value.match("[0-9]+")) {
    userPhoneNumber.removeAttribute("style");
  }
};
userApprovedVacations.onblur = function () {
  if (
    userApprovedVacations.value != "" &&
    userApprovedVacations.value.match("[0-9]+")
  ) {
    userApprovedVacations.removeAttribute("style");
  }
};
userAvailableVacations.onblur = function () {
  if (
    userAvailableVacations.value != "" &&
    userAvailableVacations.value.match("[0-9]+")
  ) {
    userAvailableVacations.removeAttribute("style");
  }
};
userSalary.onblur = function () {
  if (userSalary.value.match("[0-9]+")) {
    userSalary.removeAttribute("style");
  }
};
let validName = false,
  validEmail = false,
  validID = false,
  validAddress = false,
  validPhone = false,
  validApprovedVacations = false,
  validAvailableVacations = false,
  validSalary = false,
  validDob = true;
document.forms[0].onsubmit = function (ele) {
  if (
    userName.value != "" &&
    userName.value.length > 2 &&
    userName.value.match("[A-Za-z]+")
  ) {
    validName = true;
  } else {
    userName.style.cssText = "border: 1px solid red;";
  }
  if (
    userID.value != "" &&
    userID.value.match("[0-9]") &&
    userID.value.length <= 14
  ) {
    validID = true;
  } else {
    userID.style.cssText = "border: 1px solid red;";
  }
  if (userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")) {
    validEmail = true;
  } else {
    userEmail.style.cssText = "border: 1px solid red;";
  }
  if (userAddress.value != "" && userAddress.value.length > 8) {
    validAddress = true;
  } else {
    userAddress.style.cssText = "border: 1px solid red;";
  }
  if (
    userPhoneNumber.value != "" &&
    userPhoneNumber.value.match("[0-9]+") &&
    userPhoneNumber.value.length <= 15
  ) {
    validPhone = true;
  } else {
    userPhoneNumber.style.cssText = "border: 1px solid red;";
  }
  if (
    userApprovedVacations.value != "" &&
    userApprovedVacations.value.match("[0-9]+") &&
    userApprovedVacations.value >= 0
  ) {
    validApprovedVacations = true;
  } else {
    userApprovedVacations.style.cssText = "border: 1px solid red;";
  }
  if (
    userAvailableVacations.value != "" &&
    userAvailableVacations.value.match("[0-9]+") &&
    userAvailableVacations.value > 0
  ) {
    validAvailableVacations = true;
  } else {
    userAvailableVacations.style.cssText = "border: 1px solid red;";
  }
  if (userSalary.value.match("[0-9]+") && userSalary.value > 2000) {
    validSalary = true;
  } else {
    userSalary.style.cssText = "border: 1px solid red;";
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("emp_add");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      validName === false ||
      validEmail === false ||
      validID === false ||
      validAddress === false ||
      validPhone === false ||
      validApprovedVacations === false ||
      validAvailableVacations === false ||
      validSalary === false ||
      validDob === false
    ) {
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

      xhttp.open("POST", "/add_employee/", true);
      xhttp.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

      xhttp.send(JSON.stringify({"name": userName.value, "email": userEmail.value, "id": userID.value, "address": userAddress.value, "phone": userPhoneNumber.value, "approved_vacations": userApprovedVacations.value,
                                  "available_vacations": userAvailableVacations.value, "salary": userSalary.value, "dob": userDateofBirth.value, "gender": userGender.value, "martial-status" : userMartialStatues.value, "admin-username": sessionStorage.getItem("admin-username")}));
      // formData+{"admin-username":sessionStorage.getItem("admin-username")}
      // let userName = document.forms[0].querySelector("#name-input");
      // let userEmail = document.forms[0].querySelector("#email-input");
      // let userID = document.forms[0].querySelector("#id-input");
      // let userAddress = document.forms[0].querySelector("#address-input");
      // let userPhoneNumber = document.forms[0].querySelector("#phone-input");
      // let userApprovedVacations =
      //   document.forms[0].querySelector("#approved-vacation");
      // let userAvailableVacations = document.forms[0].querySelector(
      //   "#available-vacation"
      // );
      // let userSalary = document.forms[0].querySelector("#salary-input");
      // let userDateofBirth = document.forms[0].querySelector("#dob-input");
      // let userGender = document.forms[0].querySelector('input[name="os"]:checked');
      // let userMartialStatues = document.forms[0].querySelector(
      //   "#martial-status-input"
      // );
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
