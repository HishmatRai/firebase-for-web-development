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
      message.innerHTML = "Successfully logged in";
      message.setAttribute("class", "success");
      btn.value = "Log In";
      console.log(res.user);
      if (res.user.emailVerified) {
        setTimeout(() => {
          window.location.assign("./home.html");
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.assign("./verify-email.html");
        }, 2000);
      }
      // move
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = "Email or Password is incorrect";
      message.setAttribute("class", "error");
      btn.value = "Log In";
    });
};
