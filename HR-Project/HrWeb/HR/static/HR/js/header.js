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
let links = document.createElement("ul");
links.setAttribute("id", "small-links");
links.innerHTML = `
  <li><a href="/homepage/">home</a></li>
  <li><a href="/search/">search</a></li>
  <li><a href="/add/">add</a></li>
  <li><a href="/update/">update</a></li>
  <li><a href="/vacations/">vacations list</a></li>
`;
let list_opend = false;
list_symbol.onclick = function () {
  if (list_opend === false) {
    list_symbol.append(links);
    list_opend = true;
  } else {
    links.remove();
    list_opend = false;
  }
};