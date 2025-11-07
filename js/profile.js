let fullName = document.getElementById("fullname");
let email = document.getElementById("email");
let age = document.getElementById("age");
let phone = document.getElementById("phone");
let gender = document.getElementsByName("gender");
let bio = document.getElementById("bio");
let message = document.getElementById("message");
let updateBtn = document.getElementById("updateBtn");
let userId = document.getElementById("userId");
let emailVerified = document.getElementById("emailVerified");
let lastSignIn = document.getElementById("lastSignIn");
let createdDate = document.getElementById("createdDate");
let profileImage = document.getElementById("profileImage");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      console.log("user ====>>>>>", user);
      userId.innerHTML = user?.uid;
      emailVerified.innerHTML = user?.emailVerified;
      lastSignIn.innerHTML = user?.metadata?.lastSignInTime;
      createdDate.innerHTML = user?.metadata?.creationTime;
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", (userRes) => {
          console.log("profile page => ", userRes.val());
          fullName.value = userRes.val().fullName;
          email.value = userRes.val().email;
          age.value = userRes.val().age;
          userRes.val().phone && (phone.value = userRes.val().phone);
          userRes.val().bio && (bio.value = userRes.val().bio);
          userRes.val().profileImgURL &&
            (profileImage.src = userRes.val().profileImgURL);
          for (let i = 0; i < gender.length; i++) {
            if (gender[i].value == userRes.val().gender) {
              gender[i].checked = true;
            }
          }
        });
    }
  }
});

// update
const updateProfileHandler = () => {
  message.style.display = "block";
  updateBtn.value = "Loading ...";
  let selectedAge = age.options[age.selectedIndex].value;
  let selectedGender;
  for (let index in gender) {
    if (gender[index].checked) {
      selectedGender = gender[index].value;
    }
  }
  firebase
    .database()
    .ref("users/" + uid)
    .update({
      fullName: fullName.value,
      age: selectedAge,
      gender: selectedGender,
      phone: phone.value,
      bio: bio.value,
    })
    .then(() => {
      message.innerHTML = "Profile updated successfully";
      message.setAttribute("class", "success");
      updateBtn.value = "Update Profile";
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
      updateBtn.value = "Update Profile";
    });
};
