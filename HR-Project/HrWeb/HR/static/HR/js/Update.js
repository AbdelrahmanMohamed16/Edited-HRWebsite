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
let userNotFound = new message(
  "user not found, ensure you iserted correct name",
  "CLOSE",
  "update-error"
);
let formErrorMessage = new message(
  "invalid data, please insure that you inserted correct data.",
  "ok",
  "form-error"
);
let userName = document.forms[0].querySelector("#name-input");
let userEmail = document.forms[0].querySelector("#email-input");
let userAddress = document.forms[0].querySelector("#address-input");
let userPhoneNumber = document.forms[0].querySelector("#phone-input");
let userSalary = document.forms[0].querySelector("#salary-input");
let userDateofBirth = document.forms[0].querySelector("#dob-input");
let userMartialStatues = document.forms[0].querySelector(
  "#martial-status-input"
);
let userAvailableVacations = document.forms[0].querySelector(
  "#available-vacations-input"
);
let lastID = localStorage.getItem("lastID") || 1;
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
    validPhone == false ||
    validSalary == false ||
    validUserAvailableVacations === false
  ) {
    ele.preventDefault();
    userNotFound.displayMessage();
  } else if (validName === true) {
    let found = false;
    for (let i = 1; i < lastID && found === false; i++) {
      let name = localStorage.getItem(`userName ${i}`);
      if (name == userName.value) {
        if (userEmail.value != "") {
          localStorage.setItem(`userEmail ${i}`, userEmail.value);
        }
        if (userAddress.value != "") {
          localStorage.setItem(`userAddress ${i}`, userAddress.value);
        }
        if (userPhoneNumber.value != "") {
          localStorage.setItem(`userPhoneNumber ${i}`, userPhoneNumber.value);
        }
        if (userSalary.value != "") {
          localStorage.setItem(`userSalary ${i}`, userSalary.value);
        }
        if (userMartialStatues.value != "") {
          localStorage.setItem(
            `userMartialStatues ${i}`,
            userMartialStatues.value
          );
        }
        if (userAvailableVacations.value != "") {
          localStorage.setItem(
            `userAvailableVacations ${i}`,
            userAvailableVacations.value
          );
        }
        found = true;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "Update_employee/", true);
        xhr.setRequestHeader("Content-Type"); //////////////
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log("Update successful");
            } else {
              console.error("Update failed", xhr.statusText);
            }
          }
        };
        xhr.send(
          `name=${userName.value}&email=${userEmail.value}&address=${userAddress.value}&phone=${userPhoneNumber.value}&salary=${userSalary.value}&maritalStatus=${userMartialStatues.value}&availableVacations=${userAvailableVacations.value}`
        );
      }
    }
    if (found === false) {
      ele.preventDefault();
      userNotFound.displayMessage();
    }
  }
};
