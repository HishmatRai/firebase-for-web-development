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

// login with google
const loginWithGoogleHandler = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  message.style.display = "block";
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      // sign in || sign up
      firebase
        .database()
        .ref("users/" + res.user.uid)
        .once("value")
        .then((userRes) => {
          if (userRes.val()) {
            message.innerHTML = "Successfully logged in";
            message.setAttribute("class", "success");
            btn.value = "Log In";
            setTimeout(() => {
              window.location.assign("./home.html");
            }, 2000);
          } else {
            firebase
              .database()
              .ref("users/" + res.user.uid)
              .set({
                fullName: res.user.displayName,
                email: res.user.email,
                age: "25",
                gender: "Male",
                phone: res.user.phoneNumber,
                profileImgURL: res.user.photoURL,
              })
              .then(() => {
                message.innerHTML = "Successfully logged in";
                message.setAttribute("class", "success");
                btn.value = "Log In";
                setTimeout(() => {
                  window.location.assign("./home.html");
                }, 2000);
              });
          }
        });
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
    });
};

// login with facebook
const loginWithFacebookHandler = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  message.style.display = "block";
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      // sign in || sign up
      firebase
        .database()
        .ref("users/" + res.user.uid)
        .once("value")
        .then((userRes) => {
          if (userRes.val()) {
            message.innerHTML = "Successfully logged in";
            message.setAttribute("class", "success");
            btn.value = "Log In";
            setTimeout(() => {
              window.location.assign("./home.html");
            }, 2000);
          } else {
            firebase
              .database()
              .ref("users/" + res.user.uid)
              .set({
                fullName: res.user.displayName,
                email: res.user.email,
                age: "25",
                gender: "Male",
                phone: res.user.phoneNumber,
                profileImgURL: res.user.photoURL,
              })
              .then(() => {
                message.innerHTML = "Successfully logged in";
                message.setAttribute("class", "success");
                btn.value = "Log In";
                setTimeout(() => {
                  window.location.assign("./home.html");
                }, 2000);
              });
          }
        });
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
    });
};
