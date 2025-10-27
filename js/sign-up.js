let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let btn = document.getElementById("btn");
const SignUp = () => {
  message.style.display = "block";
  btn.value = "Loading ...";
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // email verification
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          message.innerHTML =
            "Successfully created account ,please check your email and verify your account";
          message.setAttribute("class", "success");
          setTimeout(() => {
            window.location.assign("./verify-email.html");
          }, 2000);
        });
    })
    .catch((error) => {
      console.log(error.message);
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
    })
    .finally(() => {
      btn.value = "Sign Up";
    });
};
