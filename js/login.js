let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let btn = document.getElementById("btn");

const LoginHandler = () => {
  message.style.display = "block";
  btn.value = "Loading ...";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      console.log(res.user);
      message.innerHTML = "Successfully logged in";
      message.setAttribute("class", "success");
      btn.value = "Log In";
      // move
      // window.location.assign("./home.html");
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = "Email or Password is incorrect";
      message.setAttribute("class", "error");
      btn.value = "Log In";
    });
};
