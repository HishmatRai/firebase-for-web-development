firebase.auth().onAuthStateChanged((user) => {
  // user data -< null
  if (user) {
    console.log(user)
    // emailVerified = false
    if (user.emailVerified) {
      console.log("verified true",user);
      // login true
      // emailverified true
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

// home ->
// login : true -> home  false ->login.html
