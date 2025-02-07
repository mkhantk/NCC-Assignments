//variables
const createForm = document.querySelector("#createForm");
const afterCreateImg = document.querySelector("#afterCreateImg");
const url = "https://best-scented-operation.glitch.me/posts";
let createData = {};

window.onload = async () => {
  const data = await fetch(url);
  const result = await data.json();

  // console.log(result);
  let count = result.length;

  createData.id = (count + 1).toString();
};

createForm.createImg.addEventListener("input", (e) => {
  afterCreateImg.src = e.target.files[0].name;
});

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  createData.title = createForm.createTitle.value;
  createData.image_url = createForm.createImg.files[0].name;
  createData.content = createForm.createContent.value;
  createData.created_at = new Date().toISOString();
  createData.created_by = JSON.parse(
    localStorage.getItem("bloggify_js_app")
  ).name;
  // console.log(createData.created_by);

  const resonse = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createData),
  })
    .then((response) => response.json())
    .then((response) => console.log(resonse))
    .catch((error) => console.error(error));

  window.location.href = "homepage.html";
});

// console.log(new Date().toISOString());
