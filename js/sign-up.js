let email = document.getElementById("email");
let password = document.getElementById("password");
const SignUp = () => {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
};
