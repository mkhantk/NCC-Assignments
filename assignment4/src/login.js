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
    // let string = JSON.stringify(data);
    checkUser(data);

    // localStorage.setItem("BlogX_js_app", string);
    // window.location.replace("homepage.html");
  }
});

//how login flow
//for now, when clicked login, it go stright to localstorage and store the variable there.
//now, i want to add default variable like admin username and password.
//and when i click the login, it will check the database first whether the username exit.
//if it exit, it will check the creditantials first then, if correct, it will go with previous flow. if incorrect, it will as kthe user to enter again.
//if it doesn't exit, it will add it to the databse for later use. the rest is still the same.

async function checkUser(data) {
  const url = `https://best-scented-operation.glitch.me/users/`;
  const response = await fetch(url);
  const result = await response.json();

  const checking = await result.filter((item) => item.name === data.name);

  if (checking[0]) {
    console.log(checking);
    if (checking[0].pwd === data.password) {
      console.log(true);
      let string = JSON.stringify(data);
      localStorage.setItem("BlogX_js_app", string);
      window.location.replace("homepage.html");
      document.querySelector(".incorrectPwd").style.display = "none";
    } else {
      document.querySelector(".incorrectPwd").style.display = "block";
    }
  } else {
    console.log(false);
    loginNewUser(url, data);

    //if false, this shows that there is no data about this uername in the database.
    // so, there are two task to do
    // one is to add the new data  to the database with fetch
    // the other is to add the data to the localstorage and login the username
  }
}

async function loginNewUser(url, data) {
  let string = JSON.stringify(data);
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: string,
  })
    .then((respnse) => respnse.json())
    .then((respnse) => console.log(respnse))
    .catch((error) => console.error(error));

  localStorage.setItem("BlogX_js_app", string);
  window.location.replace("homepage.html");
}
