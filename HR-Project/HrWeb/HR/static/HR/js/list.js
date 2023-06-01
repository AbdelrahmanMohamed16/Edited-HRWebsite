document.addEventListener("DOMContentLoaded", function () {
  var b = document.getElementById("button");
  console.log(5555555);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/list/", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(response);
        var response = JSON.parse(xhr.responseText);
        let employee;
        for (var i = 0; i < response.length; i++) {
          employee = response[i];
          let ay7aga = new card(employee.name, employee.id);
          ay7aga.displayCard();
        }
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };
  xhr.send();

  console.log(8888888);
});
