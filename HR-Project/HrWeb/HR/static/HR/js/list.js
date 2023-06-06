class card {
  constructor(
    n = "",
    id = "",
    R = "",
    from = vacation.start(),
    to = vacation.start()
  ) {
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
          <input type="vacation.start" name="begin" placeholder="dd-mm-yyyy" value="${this.from}" min="1997-01-01" max="2030-12-31" disabled class="from">
        </div>
        <div class="sub-flex-row">
          <label for="to"> To </label>
          <input type="vacation.start" name="begin"
          placeholder="dd-mm-yyyy" value="${this.to}"
          min="1997-01-01" max="2030-12-31" disabled class="from">
        </div>
      </div>
      <div class="sub-flex">
        <button type="button" name="button" class="accept" onclick ="closeAcceptedObject(this.parentNode.parentNode,${this.id})">Accept</button>
        <button type="button" name="button" class="reject" onclick ="closeRejectedObject(this.parentNode.parentNode,${this.id})">Reject</button>
      </div>
      `;
  }

  displayCard() {
    let d = document.createElement("div");
    d.className = "card";
    d.innerHTML = this.cardStructure;
    let container = document.querySelector(".vacations");
    container.appendChild(d);
  }
}

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
    let container = document.querySelector(".vacations");
    container.appendChild(d);
  }
}
close_message = function (e) {
  e.remove();
};

closeAcceptedObject = function (e, id) {
  req = new XMLHttpRequest();
  req.open("POST", "/ACCEPT/", true);
  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let Message = new message(JSON.parse(this.responseText).message, "OK", "Accept Message");
        Message.displayMessage();
      e.remove();
      }
    }
  };

  req.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({"id": id }));
};

closeRejectedObject = function (e, id) {
  req = new XMLHttpRequest();
  req.open("POST", "/REJECT/", true);
  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let Message = new message(JSON.parse(this.responseText).message, "OK", "Reject Message");
        Message.displayMessage();
      e.remove();
      }
    }
  };

  req.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({"id": id }));
};

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

document.addEventListener("DOMContentLoaded", function () {
  var b = document.getElementById("button");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/list/", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        let vacation;
        for (var i = 0; i < response.length; i++) {
          vacation = response[i];
          let c = new card(
            vacation.name,
            vacation.id,
            vacation.reason,
            vacation.start,
            vacation.end
          );
          c.displayCard();
        }
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };
  xhr.send();
});
