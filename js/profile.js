let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let age = document.getElementById("age");
let phone = document.getElementById("phone");
let gender = document.getElementsByName("gender");
let bio = document.getElementById("bio");
let message = document.getElementById("message");
let updateBtn = document.getElementById("updateBtn");
let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
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
          bio.value = userRes.val().bio;
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
      firstname: firstName.value,
      lastname: lastName.value,
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
