let userName = document.getElementById("userName");
let userInitial = document.getElementById("userInitial");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (userRes) => {
          userName.innerHTML = `${userRes.val().firstname} ${
            userRes.val().lastname
          }`;
          userInitial.innerHTML = userRes
            .val()
            .firstname.slice(0, 1)
            .toUpperCase();
        });
    } else {
      window.location.assign("./verify-email.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});
const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    });
};
