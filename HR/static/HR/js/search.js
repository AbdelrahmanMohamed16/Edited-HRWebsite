
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let list_symbol = document.querySelector('.symbol');
let list_opend = false;
let list = document.createElement('ul');
list.setAttribute('id','small-links');
let li1 = document.createElement('li');
let link1 = document.createElement('a');
link1.setAttribute('href','#');
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
let last_ID = localStorage.getItem('lastID');
class card {
  constructor(n = "", id = "") {
    this.name = n;
    this.id = id;
    this.cardStructure = `
    <img src="images\\user-icon.png" alt="" class = "image">
    <div class="text">
      <p>
        name: ${this.name}
      </p>

      <p>
        ID: ${this.id}
      </p>
    </div>
    <a href="submitvacation.html"><button type="button" class="button">apply vacation form</button></a>
    `;
  }
  displayCard() {
    let d = document.createElement('div');
    d.className = "emm";
    d.innerHTML = this.cardStructure;
    let container = document.querySelector('.em');
    container.appendChild(d);
  }
};
for (let i = 1; i < last_ID; i++){
  let name = localStorage.getItem(`userName ${i}`);
  let id = localStorage.getItem(`userID ${i}`);
  let Card = new card(name,id);
  console.log(Card);
  Card.displayCard();
}
let searchButton = document.querySelector('#searchbutton');
searchButton.onclick = function(ele){
  let searchInput = document.querySelector('#searchinput');
  let searchName = searchInput.value;
  let container = document.querySelector('.em');
  container.innerHTML = "";
  for (let i = 1; i < last_ID; i++){
    let name = localStorage.getItem(`userName ${i}`);
    if(name == searchName){
      let id = localStorage.getItem(`userID ${i}`);
      let Card = new card(name,id);
      Card.displayCard();
    }
  }
}