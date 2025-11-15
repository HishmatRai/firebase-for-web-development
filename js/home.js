// realtime databse add data
// let input = document.getElementById("input");
// const addHandler = () => {
//
// firebase
//   .database()
//   .ref("todos/" + "todo-1")
//   .set({
//     todoValue: input.value,
//   });

//   firebase
//     .database()
//     .ref("todos/")
//     .push({
//       todoValue: input.value,
//     })
//     .then(() => {
//       input.value = "";
//     });
// };

// get data from realtime database
// firebase
// .database()
// .ref("todos/" + "-OcuHnvpaViPWlA3AJ9l")
// .on("value", (todoRes) => {
//   console.log(todoRes.val());
// });

// firebase
//   .database()
//   .ref("todos/")
//   .on("value", (todoRes) => {
//     //
//     todoRes.forEach((todo) => {
//       console.log(todo.val());
//     });
//   });

// firestore data add
// firebase
//     .firestore()
//     .collection("todos").doc("id").set()

//     firebase
//     .firestore()
//     .collection("todos").add()

// get data
// firebase.database().ref("folder/"+"id").on()
// firebase
//   .firestore()
//   .collection("todos")
//   .doc("7lV7108kW72ZB2xg1Q9R")
//   .get()
//   .then((res) => {
//     console.log(res.data());
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// firebase
//   .firestore()
//   .collection("todos")
//   .get()
//   .then((res) => {
//     res.forEach((todoValue) => {
//       console.log(todoValue.data());
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// firebase
//   .firestore()
//   .collection("todos")
//   .where("isVerified", "==", true)
//   .onSnapshot((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//     });
//   });
