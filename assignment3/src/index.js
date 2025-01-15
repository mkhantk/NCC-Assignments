//variable
//nav bar
const alerT = document.querySelector("#alert");
const todo = document.querySelector("#todo");
const form = document.querySelector("#form");

const alertContainer = document.querySelector("#alertContainer");
const todoContainer = document.querySelector("#todoContainer");
const formContainer = document.querySelector("#formContainer");

function handleNav(e) {
  if (e.target.id === "todo") {
    todoContainer.style.display = "block";
    alertContainer.style.display = "none";
    formContainer.style.display = "none";

    todo.classList.add("activeTab");
    form.classList.remove("activeTab");
    alerT.classList.remove("activeTab");
  } else if (e.target.id === "form") {
    todoContainer.style.display = "none";
    alertContainer.style.display = "none";
    formContainer.style.display = "block";

    todo.classList.remove("activeTab");
    form.classList.add("activeTab");
    alerT.classList.remove("activeTab");
  } else {
    todoContainer.style.display = "none";
    alertContainer.style.display = "block";
    formContainer.style.display = "none";

    todo.classList.remove("activeTab");
    form.classList.remove("activeTab");
    alerT.classList.add("activeTab");
  }
}
document.addEventListener("DOMContentLoaded", (e) => handleNav(e));

todo.addEventListener("click", (e) => handleNav(e));
alerT.addEventListener("click", (e) => handleNav(e));
form.addEventListener("click", (e) => handleNav(e));

//mainpage
//dialog
const overlay = document.querySelector(".overlay");
const dialog = document.querySelector("#dialog");
const openedDialog = document.querySelector("#openedDialog");
const closeButton = document.querySelector("#closeButton");

function handleDialog(e) {
  if (e.target.id === "dialog") {
    dialog.style.display = "none";
    overlay.style.display = "block";
    openedDialog.classList.remove("hidden");
  } else {
    dialog.style.display = "block";
    openedDialog.classList.add("hidden");
    overlay.style.display = "none";
  }
}

dialog.addEventListener("click", (e) => handleDialog(e));
closeButton.addEventListener("click", (e) => handleDialog(e));

//todo
const search = document.querySelector("#search");
const enter = document.querySelector("#enter");
const submit = document.querySelector("#submit");
const storage = document.querySelector(".storage");
const image = document.querySelector("img");
let todoList = [];
let newTodo = "";

search.addEventListener("input", (e) => {
  // console.log(e.currentTarget.value);
  if (e.currentTarget.value) {
    let searchItem = todoList.filter((item) =>
      item.includes(e.currentTarget.value)
    );
    displayTodoList(searchItem);
    updateList();
  } else {
    displayTodoList(todoList);
    updateList();
  }
});

enter.addEventListener("input", (e) => {
  newTodo = e.target.value;
});

submit.addEventListener("click", () => {
  if (enter.value) {
    todoList.push(newTodo);
    newTodo = "";
    enter.value = "";
  }
  displayTodoList(todoList);
  updateList();
  // console.log(todoList);
});

// storage.addEventListener("change", () => {
//   displayTodoList();
//   updateList();
// });

function displayTodoList(todoList) {
  storage.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    let item = document.createElement("tr");
    storage.appendChild(item);

    let data1 = document.createElement("td");
    data1.textContent = todoList[i];
    item.appendChild(data1);

    let data2 = document.createElement("td");
    let img = document.createElement("img");
    img.src = "./images/trash.svg";
    img.alt = "";
    img.classList.add("delete");
    img.id = i;
    data2.appendChild(img);

    item.appendChild(data2);
  }
}

function updateList() {
  let imgList = document.querySelectorAll(".delete");
  imgList.forEach((img) => {
    img.addEventListener("click", (e) => {
      // console.log(e.target.id);
      todoList.splice(e.target.id, 1);
      e.target.closest("tr").remove();

      displayTodoList(todoList);
      updateList();
    });
  });
}

// login page
const loginForm = document.querySelector("#loginForm");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const login = document.querySelector("#loginButton");

const namePattern = /[a-zA-Z][0-9]/;
const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!namePattern.test(userName.value)) {
    document.querySelector("#nameError").style.display = "block";
    userName.classList.add("error");
    // console.log(document.getElementById("nameError").style);
  } else {
    document.querySelector("#nameError").style.display = "none";
    userName.classList.remove("error");
  }

  if (!emailPattern.test(email.value)) {
    document.querySelector("#emailError").style.display = "block";
    email.classList.add("error");
  } else {
    document.querySelector("#emailError").style.display = "none";
    email.classList.remove("error");
  }

  if (pwd.value.length >= 6) {
    document.querySelector("#passwordError").style.display = "none";
    pwd.classList.remove("error");
  } else {
    document.querySelector("#passwordError").style.display = "block";
    pwd.classList.add("error");
  }
});
