// class message {
//   constructor(t = "", b = "", n = "") {
//     this.name = n;
//     this.text = t;
//     this.buttonText = b;
//     this.messageStructure = `
//       <div class="message-container">
//         <p>${this.text}</p>
//         <button onclick="close_message(this.parentNode.parentNode)">${this.buttonText}</button>
//       </div>
//     `;
//   }
//   displayMessage() {
//     let d = document.createElement("div");
//     d.className = "message";
//     d.setAttribute("id", this.name);
//     d.innerHTML = this.messageStructure;
//     document.forms[0].after(d);
//     // document.write(this.messageStructure);
//   }
// }

// let section = document.querySelector(".second-section");
// let close_message = function (object) {
//   object.remove();
// };
// let formErrorMessage = new message(
//   "invalid data, please insure that you inserted correct data.",
//   "ok",
//   "form-error"
// );
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
// let message_button = document.forms[0].querySelector("#close-message");
// userName.onblur = function () {
//   if (
//     userName.value != "" &&
//     userName.value.length > 2 &&
//     userName.value.match("[A-Za-z]+")
//   ) {
//     userName.removeAttribute("style");
//   }
// };
// userID.onblur = function () {
//   if (
//     userID.value != "" &&
//     userID.value.match("[0-9]") &&
//     userID.value.length <= 14
//   ) {
//     userID.removeAttribute("style");
//   }
// };
// userEmail.onblur = function () {
//   if (userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")) {
//     userEmail.removeAttribute("style");
//   }
// };
// userAddress.onblur = function () {
//   if (userAddress.value != "") {
//     userAddress.removeAttribute("style");
//   }
// };
// userPhoneNumber.onblur = function () {
//   if (userPhoneNumber.value != "" && userPhoneNumber.value.match("[0-9]+")) {
//     userPhoneNumber.removeAttribute("style");
//   }
// };
// userApprovedVacations.onblur = function () {
//   if (
//     userApprovedVacations.value != "" &&
//     userApprovedVacations.value.match("[0-9]+")
//   ) {
//     userApprovedVacations.removeAttribute("style");
//   }
// };
// userAvailableVacations.onblur = function () {
//   if (
//     userAvailableVacations.value != "" &&
//     userAvailableVacations.value.match("[0-9]+")
//   ) {
//     userAvailableVacations.removeAttribute("style");
//   }
// };
// userSalary.onblur = function () {
//   if (userSalary.value.match("[0-9]+")) {
//     userSalary.removeAttribute("style");
//   }
// };
// document.forms[0].onsubmit = function (ele) {
//   let validName = false,
//     validEmail = false,
//     validID = false,
//     validAddress = false,
//     validPhone = false,
//     validApprovedVacations = false,
//     validAvailableVacations = false,
//     validSalary = false,
//     validDob = true;
//   if (
//     userName.value != "" &&
//     userName.value.length > 2 &&
//     userName.value.match("[A-Za-z]+")
//   ) {
//     validName = true;
//   } else {
//     userName.style.cssText = "border: 1px solid red;";
//   }
//   if (
//     userID.value != "" &&
//     userID.value.match("[0-9]") &&
//     userID.value.length <= 14
//   ) {
//     validID = true;
//   } else {
//     userID.style.cssText = "border: 1px solid red;";
//   }
//   if (userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")) {
//     validEmail = true;
//   } else {
//     userEmail.style.cssText = "border: 1px solid red;";
//   }
//   if (userAddress.value != "" && userAddress.value.length > 8) {
//     validAddress = true;
//   } else {
//     userAddress.style.cssText = "border: 1px solid red;";
//   }
//   if (
//     userPhoneNumber.value != "" &&
//     userPhoneNumber.value.match("[0-9]+") &&
//     userPhoneNumber.value.length <= 15
//   ) {
//     validPhone = true;
//   } else {
//     userPhoneNumber.style.cssText = "border: 1px solid red;";
//   }
//   if (
//     userApprovedVacations.value != "" &&
//     userApprovedVacations.value.match("[0-9]+") &&
//     userApprovedVacations.value > 0
//   ) {
//     validApprovedVacations = true;
//   } else {
//     userApprovedVacations.style.cssText = "border: 1px solid red;";
//   }
//   if (
//     userAvailableVacations.value != "" &&
//     userAvailableVacations.value.match("[0-9]+") &&
//     userAvailableVacations.value > 0
//   ) {
//     validAvailableVacations = true;
//   } else {
//     userAvailableVacations.style.cssText = "border: 1px solid red;";
//   }
//   if (userSalary.value.match("[0-9]+") && userSalary.value > 2000) {
//     validSalary = true;
//   } else {
//     userSalary.style.cssText = "border: 1px solid red;";
//   }
//   if (
//     validName === false ||
//     validEmail === false ||
//     validID === false ||
//     validAddress === false ||
//     validPhone === false ||
//     validApprovedVacations === false ||
//     validAvailableVacations === false ||
//     validSalary === false ||
//     validDob === false
//   ) {
//     ele.preventDefault();
//     formErrorMessage.displayMessage();
//   } else {
//     //   let postRequest = new XMLHttpRequest();

//     //   postRequest.onreadystatechange = function () {
//     //     if (this.readyState === 4 && this.status === 200) {
//     //       let response = JSON.parse(postRequest.responseText);
//     //       console.log(response);
//     //       console.log("i am here 2222");
//     //     }
//     //   };

//     //   postRequest.open(
//     //     "POST",
//     //     "http://127.0.0.1:8000/app/addEmployee",
//     //     JSON.stringify({
//     //       "id-input": userID.value,
//     //       "email-input": userEmail.value,
//     //       "name-input": userName.value,
//     //       "address-input": userAddress.value,
//     //       "phone-input": userPhoneNumber.value,
//     //       "approved-vacation": userApprovedVacations.value,
//     //       "available-vacation": userAvailableVacations.value,
//     //       "salary-input": userSalary.value,
//     //       "dob-input": userDateofBirth.value,
//     //       "gender-input": userGender.value,
//     //       "martial-status-input": userMartialStatues.value,
//     //     }),
//     //     true
//     //   );
//     //   postRequest.setRequestHeader("Content-Type", "application/json");
//     //   console.log("i am here");
//     //   postRequest.send();
//     ele.preventDefault();
//     const formData = {
//       "id-input": userID.value,
//       "email-input": userEmail.value,
//       "name-input": userName.value,
//       "address-input": userAddress.value,
//       "phone-input": userPhoneNumber.value,
//       "approved-vacation": userApprovedVacations.value,
//       "available-vacation": userAvailableVacations.value,
//       "salary-input": userSalary.value,
//       "dob-input": userDateofBirth.value,
//       "gender-input": "male",
//       "martial-status-input": userMartialStatues.value,
//     };
//     // Send an AJAX request to the server

//     const xhr = new XMLHttpRequest();
//     const url = "http://127.0.0.1:8000/app/addemployee/"; // Replace with the actual URL of your server-side script

//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         if (xhr.status === 200) {
//           let Y = new message("OK", "OK", "OK");
//           Y.displayMessage();
//           // Request was successful
//         } else {
//           // Request failed
//           let Y = new message("NO", "NO", "NO");
//           Y.displayMessage();
//         }
//       }
//     };

//     xhr.send(JSON.stringify(formData));
//   }
// };

// let clicked = false;
// function open_list() {
//   if (!clicked) {
//     document.getElementById("small-links").style.display = "flex";
//     clicked = true;
//   } else {
//     document.getElementById("small-links").style.display = "none";
//     clicked = false;
//   }
// }
// let list_symbol = document.querySelector(".symbol");
// let list_opend = false;
// let list = document.createElement("ul");
// list.setAttribute("id", "small-links");
// let li1 = document.createElement("li");
// let link1 = document.createElement("a");
// link1.setAttribute("href", "index.html");
// link1.append("home");
// li1.append(link1);
// list.append(li1);
// let li2 = document.createElement("li");
// let link2 = document.createElement("a");
// link2.setAttribute("href", "search.html");
// link2.append("search");
// li2.append(link2);
// list.append(li2);
// let li3 = document.createElement("li");
// let link3 = document.createElement("a");
// link3.setAttribute("href", "#");
// link3.append("add");
// li3.append(link3);
// list.append(li3);
// let li4 = document.createElement("li");
// let link4 = document.createElement("a");
// link4.setAttribute("href", "update.html");
// link4.append("update");
// li4.append(link4);
// list.append(li4);
// let li5 = document.createElement("li");
// let link5 = document.createElement("a");
// link5.setAttribute("href", "submitvacation.html");
// link5.append("submite vacation");
// li5.append(link5);
// list.append(li5);
// let li6 = document.createElement("li");
// let link6 = document.createElement("a");
// link6.setAttribute("href", "list_vacations.html");
// link6.append("vacations list");
// li6.append(link6);
// list.append(li6);
// list_symbol.onclick = function () {
//   if (list_opend === false) {
//     list_symbol.append(list);
//     list_opend = true;
//   } else {
//     list.remove();
//     list_opend = false;
//   }
// };

// function set_today_date(object) {
//   const input_date = object;
//   const date = new Date();
//   input_date.value = `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${date.getDate()}`;
// }
// set_today_date(document.getElementById("dob-input"));
// let header_link_elements = document.querySelectorAll(
//   ".header .header-content .page-links ul li"
// );
// header_link_elements.forEach(function (ele) {
//   ele.onclick = function () {
//     header_link_elements.forEach(function (ele) {
//       ele.classList.remove("active");
//     });
//     this.classList.add("active");
//   };
// });

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
let userGender = document.forms[0].querySelector('input[name="os"]:checked');
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
    userApprovedVacations.value > 0
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

  let clicked = false;
  function open_list() {
    if (!clicked) {
      document.getElementById("small-links").style.display = "flex";
      clicked = true;
    } else {
      document.getElementById("small-links").style.display = "none";
      clicked = false;
    }
  }
  let list_symbol = document.querySelector(".symbol");
  let list_opend = false;
  let list = document.createElement("ul");
  list.setAttribute("id", "small-links");
  let li1 = document.createElement("li");
  let link1 = document.createElement("a");
  link1.setAttribute("href", "index.html");
  link1.append("home");
  li1.append(link1);
  list.append(li1);
  let li2 = document.createElement("li");
  let link2 = document.createElement("a");
  link2.setAttribute("href", "search.html");
  link2.append("search");
  li2.append(link2);
  list.append(li2);
  let li3 = document.createElement("li");
  let link3 = document.createElement("a");
  link3.setAttribute("href", "#");
  link3.append("add");
  li3.append(link3);
  list.append(li3);
  let li4 = document.createElement("li");
  let link4 = document.createElement("a");
  link4.setAttribute("href", "update.html");
  link4.append("update");
  li4.append(link4);
  list.append(li4);
  let li5 = document.createElement("li");
  let link5 = document.createElement("a");
  link5.setAttribute("href", "submitvacation.html");
  link5.append("submite vacation");
  li5.append(link5);
  list.append(li5);
  let li6 = document.createElement("li");
  let link6 = document.createElement("a");
  link6.setAttribute("href", "list_vacations.html");
  link6.append("vacations list");
  li6.append(link6);
  list.append(li6);
  list_symbol.onclick = function () {
    if (list_opend === false) {
      list_symbol.append(list);
      list_opend = true;
    } else {
      list.remove();
      list_opend = false;
    }
  };

  function set_today_date(object) {
    const input_date = object;
    const date = new Date();
    input_date.value = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate()}`;
  }
  set_today_date(document.getElementById("dob-input"));
  let header_link_elements = document.querySelectorAll(
    ".header .header-content .page-links ul li"
  );
  header_link_elements.forEach(function (ele) {
    ele.onclick = function () {
      header_link_elements.forEach(function (ele) {
        ele.classList.remove("active");
      });
      this.classList.add("active");
    };
  });
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

      xhttp.open("POST", "add_employee/", true);
      xhttp.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
      xhttp.send(formData);
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
