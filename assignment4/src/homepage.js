//variables
const titles = document.querySelectorAll(".title");
const postContainer = document.querySelector("#postContainer");
const uNameDisplay = document.querySelector(".username");
let username = JSON.parse(localStorage.getItem("bloggify_js_app"));

window.onload = () => {
  // console.log(JSON.parse(username));
  uNameDisplay.innerHTML = username.name;
  getData("all");
};
titles.forEach((title) =>
  title.addEventListener("click", () => {
    getData(title.id);
  })
);

const getData = async (state) => {
  try {
    const data = await fetch("data.json");
    const result = await data.json();
    if (state === "my") {
      let filtered = result.filter((item) => item.created_by === username.name);
      displayData(filtered);
    } else {
      displayData(result);
    }

    let posts = document.querySelectorAll(".posts");
    posts.forEach((item) =>
      item.addEventListener("click", (e) => {
        localStorage.setItem("currentPage", e.currentTarget.id);
        window.open("detail.html", "_blank");
      })
    );
  } catch (error) {
    console.error(error);
  }
};

function displayData(data) {
  postContainer.innerHTML = "";

  if (data.length === 0) {
    const div = document.createElement("div");
    div.textContent = "Posts not found!";
    div.classList.add("posts");
    postContainer.appendChild(div);
  } else {
    data.map((item) => {
      //container div
      const postDiv = document.createElement("div");
      postDiv.classList.add("posts");
      postDiv.id = item.id;
      postContainer.appendChild(postDiv);

      //img
      const img = document.createElement("img");
      img.classList.add("postImg");
      img.alt = "";
      img.src = item.image_url;
      postDiv.appendChild(img);

      //another container for the rest of the items
      const div = document.createElement("div");
      div.classList.add("contentDiv");
      postDiv.appendChild(div);

      //title
      const titleDiv = document.createElement("div");
      titleDiv.classList.add("titleDiv");
      div.appendChild(titleDiv);

      const title = document.createElement("p");
      title.textContent = item.title;
      titleDiv.appendChild(title);
      //date and time

      const date = document.createElement("p");
      date.textContent = new Date(item.created_at).toDateString();

      titleDiv.appendChild(date);

      //content
      const content = document.createElement("p");
      content.textContent = item.content;
      div.appendChild(content);

      //author
      const author = document.createElement("div");
      author.textContent = "by " + item.created_by;
      author.classList.add("authorDiv");
      div.appendChild(author);
      //note: all the item must have click event to link to the full post page with option to edit and delete.
    });
  }
}
