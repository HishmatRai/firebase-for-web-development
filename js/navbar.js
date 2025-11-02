let userName = document.getElementById("userName");
let userInitial = document.getElementById("userInitial");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      console.log("verified true", user);
      // get data
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (userRes) => {
          console.log(userRes.val());
          userName.innerHTML = `${userRes.val().firstname} ${
            userRes.val().lastname
          }`;
          console.log(userRes.val().firstname.slice(0, 1));
          userInitial.innerHTML = userRes.val().firstname.slice(0, 1);
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
