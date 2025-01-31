//variables
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const toLogin = document.querySelectorAll(".login");
const toPostsPage = document.querySelectorAll(".post");
const toCreate = document.querySelectorAll(".create");
const toLanding = document.querySelectorAll(".landing");

toLanding.forEach((item) => {
  item.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

toLogin.forEach((item) =>
  item.addEventListener("click", () => {
    window.location.href = "login.html";
  })
);

toPostsPage.forEach((item) =>
  item.addEventListener("click", () => {
    if (localStorage.getItem("bloggify_js_app")) {
      window.location.href = "homepage.html";
    } else {
      window.location.href = "login.html";
    }
  })
);

toCreate.forEach((item) =>
  item.addEventListener("click", () => {
    if (localStorage.getItem("bloggify_js_app")) {
      window.location.href = "create.html";
    } else {
      window.location.href = "login.html";
    }
  })
);
//check if there is any item in local storage to determin whether to show login or logout button
document.addEventListener("DOMContentLoaded", () => {
  // console.log("loaded");
  if (localStorage.getItem("bloggify_js_app")) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    // window.location.href = "homepage.html";
    // console.log("logined");
  } else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    console.log("logoted");
  }
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("bloggify_js_app");
  localStorage.clear();
  window.location.href = "index.html";
});
