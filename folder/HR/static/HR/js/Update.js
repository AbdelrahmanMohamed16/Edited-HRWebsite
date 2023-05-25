

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
    let d = document.createElement('div');
    d.className = "message";
    d.setAttribute("id",this.name)
    d.innerHTML = this.messageStructure;
    document.forms[0].after(d);
    // document.write(this.messageStructure);
  }
};

let close_message = function (object) {
  object.remove();
}
let userNotFound = new message("user not found, ensure you iserted correct name","CLOSE","update-error");
let formErrorMessage = new message("invalid data, please insure that you inserted correct data.","ok","form-error");
let userName = document.forms[0].querySelector('#name-input');
let userEmail = document.forms[0].querySelector('#email-input');
let userAddress = document.forms[0].querySelector('#address-input');
let userPhoneNumber = document.forms[0].querySelector('#phone-input');
let userSalary = document.forms[0].querySelector('#salary-input');
let userDateofBirth = document.forms[0].querySelector('#dob-input');
let userMartialStatues = document.forms[0].querySelector('#martial-status-input');
let userAvailableVacations = document.forms[0].querySelector('#available-vacations-input');
let lastID = localStorage.getItem("lastID") || 1;
userName.onblur = function (){
  if(userName.value != "" && userName.value.length > 2 && userName.value.match("[A-Za-z]+")){
    userName.removeAttribute("style");
  } 
}

userEmail.onblur = function (){
  if(userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")){
    userEmail.removeAttribute("style");
  } 
}
userAddress.onblur = function (){
  if(userAddress.value != ""){
    userAddress.removeAttribute("style");
  } 
}
userPhoneNumber.onblur = function (){
  if(userPhoneNumber.value != "" && userPhoneNumber.value.match("[0-9]+")){
    userPhoneNumber.removeAttribute("style");
  } 
}
userSalary.onblur = function (){
  if(userSalary.value.match("[0-9]+")){
    userSalary.removeAttribute("style");
  } 
}
userAvailableVacations.onblur = function (){
  if(userAvailableVacations.value.match("[0-9]+")){
    userAvailableVacations.removeAttribute("style");
  } 
}
document.forms[0].onsubmit = function (ele){
  let validName = false,
      validEmail = false,
      validAddress = false,
      validPhone = false,
      validSalary = false,
      validUserAvailableVacations = false;
      if (userName.value != ""){
        validName = true; 
      }else {
        userName.style.cssText = "border: 1px solid red;";
      }
      if (userEmail.value == "" || userEmail.value.match("[A-Za-z]+[0-9]*[@][A-Za-z]+[.][A-Za-z]+")){
        validEmail = true;
      }else {
        userEmail.style.cssText = "border: 1px solid red;";
      }
      if (userAddress.value == "" || userAddress.value.length > 8 ){
        validAddress = true;
      }else {
        userAddress.style.cssText = "border: 1px solid red;";
      }
      if (userPhoneNumber.value == "" || userPhoneNumber.value.match("[0-9]+") && userPhoneNumber.value.length <= 15){
        validPhone = true;
      }else {
        userPhoneNumber.style.cssText = "border: 1px solid red;";
      }
      if (userSalary.value == "" || userSalary.value.match("[0-9]+") && userSalary.value > 2000){
        validSalary = true;
      }else {
        userSalary.style.cssText = "border: 1px solid red;";
      }
      if (userAvailableVacations.value == "" || userAvailableVacations.value.match("[0-9]+")){
        validUserAvailableVacations = true;
      }else {
        userSalary.style.cssText = "border: 1px solid red;";
      }
      if (validName === false || validAddress === false || validEmail === false || validPhone == false || 
          validSalary == false || validUserAvailableVacations === false){
        ele.preventDefault();
        userNotFound.displayMessage();
      }
      else if (validName === true){
        let found = false;
        for (let i = 1; i < lastID && found === false; i++){
          let name = localStorage.getItem(`userName ${i}`);
          if (name == userName.value){
              if (userEmail.value != ""){
                localStorage.setItem(`userEmail ${i}`,userEmail.value);
              }
              if (userAddress.value != ""){
                localStorage.setItem(`userAddress ${i}`,userAddress.value);
              }
              if (userPhoneNumber.value != ""){
                localStorage.setItem(`userPhoneNumber ${i}`,userPhoneNumber.value);
              }
              if (userSalary.value != ""){
                localStorage.setItem(`userSalary ${i}`,userSalary.value);
              }
              if (userMartialStatues.value != ""){
                localStorage.setItem(`userMartialStatues ${i}`,userMartialStatues.value);
              }
              if (userAvailableVacations.value != ""){
                localStorage.setItem(`userAvailableVacations ${i}`,userAvailableVacations.value);
              }
            found = true;
          }
        }
        if (found === false){
          ele.preventDefault();
          userNotFound.displayMessage();
        }
      }
};
let clicked = false;
function open_list() {
  if (!clicked){
    document.getElementById('small-links').style.display = "flex";
    clicked = true;
  }
  else{
    document.getElementById('small-links').style.display = "none";
    clicked = false;
  }
}
let header_link_elements = document.querySelectorAll(".header .header-content .page-links ul li");
header_link_elements.forEach(function(ele) {
    ele.onclick = function() {
    header_link_elements.forEach(function (ele) {
      ele.classList.remove("active")
    });
    this.classList.add("active");
  };
});
let list_symbol = document.querySelector('.symbol');
let list_opend = false;
let list = document.createElement('ul');
list.setAttribute('id','small-links');
let li1 = document.createElement('li');
let link1 = document.createElement('a');
link1.setAttribute('href','index.html');
link1.append("home");
li1.append(link1);
list.append(li1);
let li2 = document.createElement('li');
let link2 = document.createElement('a');
link2.setAttribute('href','search.html');
link2.append("search");
li2.append(link2);
list.append(li2);
let li3 = document.createElement('li');
let link3 = document.createElement('a');
link3.setAttribute('href','#');
link3.append("add");
li3.append(link3);
list.append(li3);
let li4 = document.createElement('li');
let link4 = document.createElement('a');
link4.setAttribute('href','#');
link4.append("update");
li4.append(link4);
list.append(li4);
let li5 = document.createElement('li');
let link5 = document.createElement('a');
link5.setAttribute('href','submitvacation.html');
link5.append("submite vacation");
li5.append(link5);
list.append(li5);
let li6 = document.createElement('li');
let link6 = document.createElement('a');
link6.setAttribute('href','list_vacations.html');
link6.append("vacations list");
li6.append(link6);
list.append(li6);
list_symbol.onclick = function (){
  if(list_opend === false){
    list_symbol.append(list);
    list_opend = true;
  }
  else{
    list.remove();
    list_opend = false;
  }
};