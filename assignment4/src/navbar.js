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
    if (localStorage.getItem("BlogX_js_app")) {
      window.location.href = "homepage.html";
    } else {
      window.location.href = "login.html";
    }
  })
);

toCreate.forEach((item) =>
  item.addEventListener("click", () => {
    if (localStorage.getItem("BlogX_js_app")) {
      window.location.href = "create.html";
    } else {
      window.location.href = "login.html";
    }
  })
);
//check if there is any item in local storage to determin whether to show login or logout button
document.addEventListener("DOMContentLoaded", () => {
  // console.log("loaded");
  if (localStorage.getItem("BlogX_js_app")) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    // window.location.href = "homepage.html";
    // console.log("logined");
  } else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    console.log("logoted");
  }

  const url = window.location.href;
  const re = /([^\/]+?)\.html/;
  if (url.match(re)[1] === "index") {
    document.getElementById("landingPageLink").classList.add("currentPage");
    document.getElementById("homepageLink").classList.remove("currentPage");
    document.getElementById("createPostlink").classList.remove("currentPage");
  } else if (url.match(re)[1] === "homepage") {
    document.getElementById("landingPageLink").classList.remove("currentPage");
    document.getElementById("homepageLink").classList.add("currentPage");
    document.getElementById("createPostlink").classList.remove("currentPage");
    // console.log("index");
  } else if (url.match(re)[1] === "create") {
    document.getElementById("landingPageLink").classList.remove("currentPage");
    document.getElementById("homepageLink").classList.remove("currentPage");
    document.getElementById("createPostlink").classList.add("currentPage");
    // console.log("index");
  }

  // console.log(url.match(/([^\/]+?)\.html/)[0]);
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("BlogX_js_app");
  localStorage.clear();
  window.location.href = "index.html";
});
