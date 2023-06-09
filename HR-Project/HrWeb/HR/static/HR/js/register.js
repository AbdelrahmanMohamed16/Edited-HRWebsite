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
let idinput = document.querySelector('#id');
let usernameinput = document.querySelector('#username');
let nameinput = document.querySelector('#name');
let passwordinput = document.querySelector('#password');
let emailinput = document.querySelector('#email');
let phoneinput = document.querySelector('#phone');
let form = document.querySelector('.register-form');
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (idinput.value == "" || !idinput.value.match("[0-9]+")) {
            idinput.classList.add('form-input-error');
            let formError = document.querySelector('.id').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid ID!";
            formError.style.visibility = "visible";
        }
        if (usernameinput.value == "" ||!usernameinput.value.match("[A-Za-z]+[0-9]*")) {
            usernameinput.classList.add('form-input-error');
            let formError = document.querySelector('.username').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid username!";
            formError.style.visibility = "visible";
        }
        if (nameinput.value == "" || !nameinput.value.match("[A-Za-z]+[ ]*[A-Za-z]*")) {
            nameinput.classList.add('form-input-error');
            let formError = document.querySelector('.name').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid name!";
            formError.style.visibility = "visible";
        }
        if (passwordinput.value == "" || !passwordinput.value.match("[A-Za-z0-9]+")) {
            passwordinput.classList.add('form-input-error');
            let formError = document.querySelector('.password').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid password!";
            formError.style.visibility = "visible";
        }
        if (emailinput.value == "" || !emailinput.value.match("[A-Za-z0-9]+@[A-Za-z]+[.][A-Za-z]+")) {
            emailinput.classList.add('form-input-error');
            let formError = document.querySelector('.email').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid email!";
            formError.style.visibility = "visible";
        }
        if (phoneinput.value == "" || !phoneinput.value.match("[0-9]+")) {
            phoneinput.classList.add('form-input-error');
            let formError = document.querySelector('.phone').querySelector('.form-error');
            formError.innerHTML = "Please enter a valid phone number!";
            formError.style.visibility = "visible";
        }
        document.querySelectorAll('.form-input').forEach((input) => {
            input.addEventListener('input', () => {
                input.classList.remove('form-input-error');
                let formError = input.parentNode.querySelector('.form-error');
                formError.style.visibility = "hidden";
            })
        })
        request = new XMLHttpRequest();
        request.open('POST', '/register/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let response = JSON.parse(this.responseText).message;
                    console.log(response);
                    if (response == "Success"){
                        let Message = new message("You have successfully registered!", "Close", "Register Message");
                        Message.displayMessage();
                        form.reset();
                        idinput.value = "";
                        usernameinput.value = "";
                        nameinput.value = "";
                        passwordinput.value = "";
                        emailinput.value = "";
                        phoneinput.value = "";
                    }
                    else {
                        let Message = new message(response, "Close", "Login Message");
                        Message.displayMessage();
                    }
                }
            }
        }
        if (idinput.value == "" || usernameinput.value == "" || nameinput.value == "" || passwordinput.value == "" || emailinput.value == "" || phoneinput.value == ""){
            return;
        }
        request.send(JSON.stringify({"id": idinput.value, "name": nameinput.value, "username": usernameinput.value, "password": passwordinput.value, "email": emailinput.value, "phone": phoneinput.value}));
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