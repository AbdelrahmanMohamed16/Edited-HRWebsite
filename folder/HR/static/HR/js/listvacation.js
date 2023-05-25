

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
link3.setAttribute('href','add.html');
link3.append("add");
li3.append(link3);
list.append(li3);
let li4 = document.createElement('li');
let link4 = document.createElement('a');
link4.setAttribute('href','update.html');
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
link6.setAttribute('href','#');
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

class card {
  constructor(n = "", id = "", R = "", from = "", to = "") {
    this.name = n;
    this.id = id;
    this.reason = R;
    this.from = from;
    this.to = to;
    this.cardStructure = `
      <div class="sub-flex">
        <p><b>${this.name}</b></p>
        <p>${this.reason}</p>
          <p><b>${this.id}</b></p>
      </div>
      <div class="sub-flex">
        <div class="sub-flex-row">
          <label for="from"> From </label>
          <input type="date" name="begin" placeholder="dd-mm-yyyy" value="${this.from}" min="1997-01-01" max="2030-12-31" disabled class="from">
        </div>
        <div class="sub-flex-row">
          <label for="to"> To </label>
          <input type="date" name="begin"
          placeholder="dd-mm-yyyy" value="${this.to}"
          min="1997-01-01" max="2030-12-31" disabled class="from">
        </div>
      </div>
      <div class="sub-flex">
        <button type="button" name="button" class="accept" onclick =closeAcceptedObject(this.parentNode.parentNode,${this.id})>Accept</button>
        <button type="button" name="button" class="reject" onclick ="closeRejectedObject(this.parentNode.parentNode,${this.id})">Reject</button>
      </div>`
  }
  displayCard() {
    let d = document.createElement('div');
    d.className = "card";
    d.innerHTML = this.cardStructure;
    let container = document.querySelector('.vacations');
    container.appendChild(d);
  }
};

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
    let container = document.querySelector(".vacations");
    container.append(d);
    // document.write(this.messageStructure);
  }
};

let close_message = function (object) {
  object.remove();
}

let noAvailableVacations = new message("this user can't have more vacations","ok","vacationsError");
closeAcceptedObject = function(e,id){
  let error = false;
  let lastID = localStorage.getItem("lastID");
  let vacations = localStorage.getItem("vacations");
  for (let i = 1; i < lastID; i++){
    let userid = localStorage.getItem(`userID ${i}`);
    if (userid == id){
      let userApprovedVacations = localStorage.getItem(`userApprovedVacations ${i}`);
      let userAvailableVacations = localStorage.getItem(`userAvailableVacations ${i}`);
      if (userAvailableVacations > 0){
        userApprovedVacations++;
        userAvailableVacations--;
        localStorage.setItem(`userApprovedVacations ${i}`, userApprovedVacations);
        localStorage.setItem(`userAvailableVacations ${i}`, userAvailableVacations);
      }
      else{
        noAvailableVacations.displayMessage();
        error = true;
      }
      break;
    }
  }
  for(let i = 1; i < vacations && error != true; i++){
    let userid = localStorage.getItem(`vacationUserID ${i}`);
    if (userid == id){
      localStorage.removeItem(`vacationUserID ${i}`);
      localStorage.removeItem(`vacationToDate ${i}`);
      localStorage.removeItem(`vacationFromDate ${i}`);
      localStorage.removeItem(`vacationReason ${i}`);
      let vacationID = localStorage.getItem(`vacations`);
      vacationID--;
      localStorage.setItem(`vacations`,vacationID);
      e.remove();
      break;
    }
  }
}
closeRejectedObject = function(e,id){
  let vacations = localStorage.getItem("vacations");
  for(let i = 1; i < vacations; i++){
    let userid = localStorage.getItem(`vacationUserID ${i}`);
    if (userid == id){
      localStorage.removeItem(`vacationUserID ${i}`);
      localStorage.removeItem(`vacationToDate ${i}`);
      localStorage.removeItem(`vacationFromDate ${i}`);
      localStorage.removeItem(`vacationReason ${i}`);
      let vacationID = localStorage.getItem(`vacations`);
      vacationID--;
      localStorage.setItem(`vacations`,vacationID);
      break;
    }
  }
  e.remove();
}
getName = function(e){
  let lastID = localStorage.getItem("lastID");
  for (let i = 1; i < lastID; i++){
    let userid = localStorage.getItem(`userID ${i}`);
    if (userid == e){
      return localStorage.getItem(`userName ${i}`);
    }
  }
}
let vacationsNumber = localStorage.getItem("vacations");
for (let i = 1; i < vacationsNumber; i++){
  let userID = localStorage.getItem(`vacationUserID ${i}`);
  let userName = getName(userID);
  let Reason = localStorage.getItem(`vacationReason ${i}`);
  let ToDate = localStorage.getItem(`vacationToDate ${i}`);
  let FromDate = localStorage.getItem(`vacationFromDate ${i}`);
  let Card = new card(userName, userID, Reason, FromDate, ToDate);
  Card.displayCard();
}