let userName = document.getElementById("userName");
let headerProfileImg = document.getElementById("header-profile-img");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.providerData[0].providerId === "facebook.com") {
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (userRes) => {
          userName.innerHTML = `${userRes.val().fullName}`;
          if (userRes.val().profileImgURL) {
            headerProfileImg.src = userRes.val().profileImgURL;
          }
        });
    } else {
      if (user.emailVerified) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .on("value", (userRes) => {
            userName.innerHTML = `${userRes.val().fullName}`;
            if (userRes.val().profileImgURL) {
              headerProfileImg.src = userRes.val().profileImgURL;
            }
          });
      } else {
        window.location.assign("./verify-email.html");
      }
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
