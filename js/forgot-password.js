let email = document.getElementById("email");
let btn = document.getElementById("btn");
let message = document.getElementById("message");
const resetPasswordHandler = () => {
  btn.value = "Loading ...";
  message.style.display = "block";
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      message.innerHTML = "Password reset email sent!";
      message.setAttribute("class", "success");
    })
    .catch((error) => {
      var errorMessage = error.message;
      message.innerHTML = errorMessage;
      message.setAttribute("class", "error");
    })
    .finally(() => {
     btn.value = "Send Reset Link";
    });
};
