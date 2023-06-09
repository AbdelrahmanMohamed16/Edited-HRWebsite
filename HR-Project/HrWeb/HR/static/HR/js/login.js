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
        let container = document.querySelector(".main-container");
        container.appendChild(d);
    }
}
close_message = function (e) {
e.remove();
};
let usernameInput = document.querySelector('#username');
let passwordInput = document.querySelector('#password');
usernameInput.value = localStorage.getItem('username') || '';
passwordInput.value = localStorage.getItem('password') || '';
let rememberMe = document.querySelector('#remember');
let form = document.querySelector('.login-form');
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        request = new XMLHttpRequest();
        request.open('POST', '/login/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let response = JSON.parse(this.responseText).message;
                    if (response == "Success"){
                        console.log(response);
                        console.log(rememberMe);
                        if (rememberMe.checked) {
                            localStorage.setItem('username', usernameInput.value);
                            localStorage.setItem('password', passwordInput.value);
                        }
                        sessionStorage.setItem('admin-username', usernameInput.value);
                        window.location.href = "/homepage";
                    }
                    else {
                        let Message = new message(response, "Close", "Login Message");
                        Message.displayMessage();
                    }
                }
            }
        }
        request.send(JSON.stringify({"username": usernameInput.value, "password": passwordInput.value}));
    })
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