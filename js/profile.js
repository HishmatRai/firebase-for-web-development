let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let age = document.getElementById("age");
let phone = document.getElementById("phone");
let gender = document.getElementsByName("gender");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      var uid = user.uid;
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", (userRes) => {
          console.log("profile page => ", userRes.val());
          firstName.value = userRes.val().firstname;
          lastName.value = userRes.val().lastname;
          email.value = userRes.val().email;
          age.value = userRes.val().age;
          phone.value = userRes.val().phone;
          for(let i=0;i<gender.length;i++){
            if(gender[i].value==userRes.val().gender){
              gender[i].checked=true;
            }
          }
        
        });
    }
  }
});
