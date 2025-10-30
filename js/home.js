// realtime databse add data

const addHandler = () => {
  firebase
    .database()
    .ref("users/" + "user6")
    .set({
      name: "user6",
      email: "user6@gmail.com",
      age: 36,
      isStudent: false,
    });
};
