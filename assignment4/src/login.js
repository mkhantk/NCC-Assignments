const userName = document.querySelector("#username");
const pwd = document.querySelector("#pwd");
const loginForm = document.querySelector("#loginForm");
// const remember = document.querySelector("#remember");
const submit = document.querySelector("#submit");
const namePattern = /^[A-Z]/;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(userName);

  let data = {};
  if (namePattern.test(userName.value)) {
    data.name = userName.value;
    document.querySelector(".nameError").style.display = "none";
    userName.classList.remove("error");
  } else {
    document.querySelector(".nameError").style.display = "block";
    userName.classList.add("error");
  }

  if (pwd.value.length >= 6) {
    document.querySelector(".pwdError").style.display = "none";
    pwd.classList.remove("error");
    data.password = pwd.value;
  } else {
    document.querySelector(".pwdError").style.display = "block";
    pwd.classList.add("error");
  }

  if (Object.keys(data).length >= 2) {
    let string = JSON.stringify(data);
    localStorage.setItem("bloggify_js_app", string);
  }

  window.location.href = "homepage.html";
});
