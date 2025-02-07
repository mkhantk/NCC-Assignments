const postContainer = document.querySelector("#postDetailContainer");
const alertContainer = document.querySelector(".alert-box");

window.onload = () => {
  let currentPost = localStorage.getItem("currentPage");
  //fetch from data
  //display from fetched data
  getData(currentPost);
};

const getData = async (postId) => {
  try {
    // const id = postId;
    const url = `https://best-scented-operation.glitch.me/posts/${+postId}`;
    // console.log(id);
    const response = await fetch(url);
    const result = await response.json();

    //display data
    displayData(result);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) =>
      button.addEventListener("click", async (e) => {
        //check if the user is the same as the post author
        if (
          JSON.parse(localStorage.getItem("bloggify_js_app")).name ===
          result.created_by
        ) {
          // console.log(true);
          //correct user
          //if correct check whether the button is edit or delete, if edit, go straight to edit
          if (e.currentTarget.id === "edit") {
            displayEdit(result);
            //if htere is any change in edit, discardchanges will go back to previous after checking to proceed or not
            //if there is no change in edit, discardchanges will go back to previous edit
            const form = document.querySelector("#editForm");

            // console.log(initialFormValue);
            // form.editImage.addEventListener("change", (e) => {
            //   console.log(e);
            // });
            //handle submit
            form.addEventListener("submit", (event) => {
              event.preventDefault();
              //submit function
              submitEdit(result, event, url);
            });
          } else {
            document
              .querySelector(".correct-delete")
              .classList.remove("hidden");
          }
        } else {
          document.querySelector("#uname").textContent = result.created_by;
          document.querySelector(".wrong-user").classList.remove("hidden");
        }

        if (e.currentTarget.id === "cancel-wrong") {
          document.querySelector(".wrong-user").classList.add("hidden");
        } else if (e.currentTarget.id === "cancel-correct") {
          document.querySelector(".correct-delete").classList.add("hidden");
          document.querySelector(".discard").classList.add("hidden");
        } else if (e.currentTarget.id === "confirm") {
          //delete the post
          //first find out the index with the id, then splice from array, then update the data
          // result.splice(id - 1, 1);
          document.querySelector(".correct-delete").classList.add("hidden");
          // deletePost(url);
          // window.location.replace("homepage.html");
          try {
            const deleteResponse = await fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (deleteResponse.ok) {
              console.log("Post successfully deleted");
              window.location.replace("homepage.html");
            } else {
              throw new Error("failed to delete post");
            }
          } catch (deleteError) {
            console.error(deleteError);
          }
        }
        // console.log(e.target.id);
      })
    );
  } catch (error) {
    console.error(error);
  }
};

function displayData(data) {
  postContainer.innerHTML = "";
  let dataTemplate = ``;

  dataTemplate += `
  
  <h1 class="titleDetail">${data.title}</h1>
  <div class="userDateContainer">
    <div>Created by ${data.created_by}</div>
    <div>${new Date(data.created_at).toDateString()}</div>
  </div>
  <img src=${data.image_url} alt="" class="imgDetail" />
  <p class="contentDetail">${data.content}</p>
  <div class="buttonDiv">
    <button id="edit" class="editButton">Edit</button>
    <button id"delete" class="deleteButton">Delete</button>
  </div>
  
  `;

  postContainer.innerHTML = dataTemplate;
}

// const deletePost = async (url) => {
//   const response = await fetch(url, { method: "DELETE" });
//   if (response.ok) {
//     console.log("Post successfully deleted");
//   } else {
//     throw new Error("failed to delete post");
//   }
// };

function displayEdit(data) {
  postContainer.innerHTML = "";
  let dataTemplate = ``;

  dataTemplate += `
  <form action="" id="editForm" class="p-8 flex flex-col items-center justify-start gap-5">
    <input id="title" type="text" class="titleDetail  px-3 py-1 bg-gray-700 shadow-md rounded-md" placeholder="Name a title" value="${data.title}" required/>
    <div class="w-full">
      <img id="edit_Img" src=${data.image_url} alt="" class="imgDetail"/>
      <input type="file" name="editImage" id="editImage" class=" mt-4 px-3 py-1 bg-gray-700 w-full rounded-md text-gray-500 file:text-black" accept="image/*"/>
    </div>
    <textarea name="content" id="content" rows="10" placeholder="Enter the contents" class="contentDetail  bg-gray-700 rounded-md shadow-md px-3 py-1 w-full">${data.content}</textarea>
    <div class="w-full flex items-center justify-around">

      <button type="submit" class="px-5 py-2 bg-blue-500 rounded-md shadow-md text-white" >Save Changes</button>
    </div>

  </form>
  
  `;
  postContainer.innerHTML = dataTemplate;
}

async function submitEdit(data, event, url) {
  // console.log(event);
  // console.log(data);
  //compare with the existing data whicih is result and then update the changes\\
  // event.preventDefault();
  const editData = {};
  if (event.target[0].value != data.title) {
    console.log(event.target[0].value);
    editData.title = event.target[0].value;
  }

  if (event.target[1].value) {
    console.log("edited");
    editData.image_url = event.target[1].files[0].name;
    // console.log(event.target[1]);
  }
  if (event.target[2].value != data.content) {
    editData.content = event.target[2].value;
  }

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editData),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  window.location.href = "detail.html";
}
