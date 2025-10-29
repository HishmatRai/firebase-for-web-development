firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("./pages/home.html");
    } else {
      window.location.assign("./pages/verify-email.html");
    }
  } else {
    window.location.assign("./pages/login.html");
  }
});
