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
    const data = await fetch("http://localhost:3000/posts");
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
  let dataTemplate = ``;

  if (data.length === 0) {
    dataTemplate += `
      <div class="flex min-w-96 shadow-md rounded-md p-3 cursor-pointer bg-indigo-300">Posts not found!</div>
    
    `;
    postContainer.innerHTML = dataTemplate;
  } else {
    data.map((item) => {
      dataTemplate += `
      <div id=${item.id} class="posts">
        <img src=${item.image_url} alt="" class="postImg" />
        <div class="contentDiv">
          <div class="titleDiv">
            <p>${item.title}</p>
            <p>${new Date(item.created_at).toDateString()}</p>
          </div>
          <p>${item.content.split(" ").splice(0, 20).join(" ")}</p>
          <div class="authorDiv">by ${item.created_by}</div>
        </div>
      
      </div>
      
      
      `;
      postContainer.innerHTML = dataTemplate;

      //note: all the item must have click event to link to the full post page with option to edit and delete.
    });
  }
}
