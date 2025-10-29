let userEmail = document.getElementById("userEmail");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("./home.html");
    } else {
      userEmail.innerHTML = user.email;
    }
  } else {
    window.location.assign("./login.html");
  }
});

// re-send
let resendBtn = document.getElementById("resendBtn");
let message = document.getElementById("message");
const resendVerificationHandler = () => {
  message.style.display = "block";
  resendBtn.innerHTML = "Loading ...";
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      message.innerHTML = "Email verification sent!";
      message.setAttribute("class", "success");
      //   resendBtn.innerHTML = "Resend Verification Email";
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
      //   resendBtn.innerHTML = "Resend Verification Email";
    })
    .finally(() => {
      resendBtn.innerHTML = "Resend Verification Email";
    });
};

// check verify
const checkVerificationHandler = () => {
  window.location.reload();
};
