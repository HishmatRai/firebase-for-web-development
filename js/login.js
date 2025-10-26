let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let btn = document.getElementById("btn");
const LoginHandler = () => {
  btn.value = "Loading ...";
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      console.log(res.user);
      message.innerHTML = "Success!";
      message.style.color = "green";
      btn.value = "Log In";
      // move
        // window.location.assign("./home.html");
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = error.message;
      message.style.color = "red";
      btn.value = "Log In";
    });
};
