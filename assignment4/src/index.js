// //variables
// const loginButton = document.querySelector("#loginButton");
// const logoutButton = document.querySelector("#logoutButton");
// const toLogin = document.querySelectorAll(".login");
// const toPostsPage = document.querySelectorAll(".posts");
// const toCreate = document.querySelectorAll(".create");
// const toLanding = document.querySelectorAll(".landing");

// toLanding.forEach((item) => {
//   item.addEventListener("click", () => {
//     window.location.href = "index.html";
//   });
// });

// toLogin.forEach((item) =>
//   item.addEventListener("click", () => {
//     window.location.href = "login.html";
//   })
// );

// toPostsPage.forEach((item) =>
//   item.addEventListener("click", () => {
//     if (localStorage.getItem("bloggify_js_app")) {
//       window.location.href = "homepage.html";
//     } else {
//       window.location.href = "login.html";
//     }
//   })
// );

// toCreate.forEach((item) =>
//   item.addEventListener("click", () => {
//     if (localStorage.getItem("bloggify_js_app")) {
//       window.location.href = "create.html";
//     } else {
//       window.location.href = "login.html";
//     }
//   })
// );
// //check if there is any item in local storage to determin whether to show login or logout button
// window.onload = () => {
//   if (localStorage.getItem("bloggify_js_app")) {
//     loginButton.style.display = "none";
//     logoutButton.style.display = "block";
//     // window.location.href = "homepage.html";
//   } else {
//     loginButton.style.display = "block";
//     logoutButton.style.display = "none";
//   }
// };

// logoutButton.addEventListener("click", () => {
//   localStorage.removeItem("bloggify_js_app");
//   localStorage.clear();
//   window.location.href = "index.html";
// });

//fetch preview and show on the preview container
const preview = document.querySelector("#preview");
const previewContainer = document.querySelector("#preview_container");

const getData = async () => {
  try {
    const data = await fetch("data.json");
    const result = await data.json();
    console.log("this is result", result);

    result.sort(
      (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
    );
    const previewData = result.splice(0, 20);
    displayPreview(previewData);
  } catch (error) {
    console.error(error);
  }
};

getData();

function displayPreview(data) {
  data.map((item) => {
    let div = document.createElement("div");
    div.id = item.id;
    div.classList.add("previewItem");
    previewContainer.appendChild(div);

    //create image, content and autor
    let img = document.createElement("img");
    img.src = item.image_url;
    img.alt = "";
    img.classList.add("previewImg");
    div.appendChild(img);

    let content = document.createElement("p");
    content.textContent = item.content;
    div.appendChild(content);

    let author = document.createElement("div");
    author.textContent = item.created_by;
    author.classList.add("author");
    div.appendChild(author);
  });
}
