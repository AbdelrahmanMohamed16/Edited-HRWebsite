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

let userID = document.forms[0].querySelector("#id-input");
userID.value = sessionStorage.getItem("id");
let userName = document.forms[0].querySelector("#name-input");
let userEmail = document.forms[0].querySelector("#email-input");
let userAddress = document.forms[0].querySelector("#address-input");
let userPhoneNumber = document.forms[0].querySelector("#phone-input");
let userSalary = document.forms[0].querySelector("#salary-input");
let userMartialStatues = document.forms[0].querySelector(
  "#martial-status-input"
);
let userAvailableVacations = document.forms[0].querySelector(
  "#available-vacations-input"
);

userName.onblur = function () {
  if (
    userName.value != "" &&
    userName.value.length > 2 &&
    userName.value.match("[A-Za-z]+")
  ) {
    userName.removeAttribute("style");
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
userSalary.onblur = function () {
  if (userSalary.value.match("[0-9]+")) {
    userSalary.removeAttribute("style");
  }
};
userAvailableVacations.onblur = function () {
  if (userAvailableVacations.value.match("[0-9]+")) {
    userAvailableVacations.removeAttribute("style");
  }
};
document.forms[0].onsubmit = function (ele) {
  let validName = false,
    validEmail = false,
    validAddress = false,
    validPhone = false,
    validSalary = false,
    validUserAvailableVacations = false;
  if (userName.value != "") {
    validName = true;
  } else {
    userName.style.cssText = "border: 1px solid red;";
  }
  if (
    userEmail.value == "" ||
    userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")
  ) {
    validEmail = true;
  } else {
    userEmail.style.cssText = "border: 1px solid red;";
  }
  if (userAddress.value == "" || userAddress.value.length > 8) {
    validAddress = true;
  } else {
    userAddress.style.cssText = "border: 1px solid red;";
  }
  if (
    userPhoneNumber.value == "" ||
    (userPhoneNumber.value.match("[0-9]+") &&
      userPhoneNumber.value.length <= 15)
  ) {
    validPhone = true;
  } else {
    userPhoneNumber.style.cssText = "border: 1px solid red;";
  }
  if (
    userSalary.value == "" ||
    (userSalary.value.match("[0-9]+") && userSalary.value > 2000)
  ) {
    validSalary = true;
  } else {
    userSalary.style.cssText = "border: 1px solid red;";
  }
  if (
    userAvailableVacations.value == "" ||
    userAvailableVacations.value.match("[0-9]+")
  ) {
    validUserAvailableVacations = true;
  } else {
    userSalary.style.cssText = "border: 1px solid red;";
  }
  if (
    validName === false ||
    validAddress === false ||
    validEmail === false ||
    validPhone === false ||
    validSalary === false ||
    validUserAvailableVacations === false
  )
    ele.preventDefault();
};


let updateForm = document.getElementById("update-form");

document.addEventListener("DOMContentLoaded", function () {
  empData = new XMLHttpRequest();
  empData.open("POST", "/EmployeeData/", true);
  empData.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
  empData.setRequestHeader('Content-Type', 'application/json');
  empData.onreadystatechange = function () {
    if (empData.readyState === XMLHttpRequest.DONE) {
      if (empData.status === 200) {
        let data = JSON.parse(empData.responseText);
        userName.value = data.name;
        userEmail.value = data.email;
        userAddress.value = data.address;
        userPhoneNumber.value = data.phone;
        userSalary.value = data.salary;
        userMartialStatues.value = data.martialstatus;
        userAvailableVacations.value = data.availableVacations;
      }
    };
  };
  empData.send(JSON.stringify({"id": userID.value }));
  
  updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/update_employee/", true);
    xhr.setRequestHeader("Content-Type","application/json"); 
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let m = new message(JSON.parse(xhr.responseText).message,"close", xhr.statusText);
          m.displayMessage();
        } else {
          let m = new message(JSON.parse(xhr.responseText).message,"close", xhr.statusText);
          m.displayMessage();
        }
      }
    };
    xhr.send(
      JSON.stringify({"id":userID.value, "name": userName.value, "email" : userEmail.value, "address" : userAddress.value, "phone" : userPhoneNumber.value, "salary" : userSalary.value, "maritalStatus" : userMartialStatues.value, "availableVacations" : userAvailableVacations.value}
      ));
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