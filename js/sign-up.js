let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let btn = document.getElementById("btn");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let age = document.getElementById("age");
let gender = document.getElementsByName("gender");
let phone = document.getElementById("phone");
const SignUp = () => {
  let selectedAge = age.options[age.selectedIndex].value;
  let selectedGender;
  for (let index in gender) {
    if (gender[index].checked) {
      selectedGender = gender[index].value;
    }
  }
  message.style.display = "block";
  btn.value = "Loading ...";
  // createUserWithEmailAndPassword => 
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // email verification
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          // data store database
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set({
              firstname: firstname.value,
              lastname: lastname.value,
              email: email.value,
              age: selectedAge,
              gender: selectedGender,
              phone: phone.value,
            })
            .then(() => {
              message.innerHTML =
                "Successfully created account ,please check your email and verify your account";
              message.setAttribute("class", "success");
              setTimeout(() => {
                window.location.assign("./verify-email.html");
              }, 2000);
            });
        });
    })
    .catch((error) => {
      console.log(error.message);
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
    })
    .finally(() => {
      btn.value = "Sign Up";
    });
};
