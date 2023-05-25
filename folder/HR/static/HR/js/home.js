

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