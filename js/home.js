// realtime databse add data
let input = document.getElementById("input");
const addHandler = () => {
  //
  // firebase
  //   .database()
  //   .ref("todos/" + "todo-1")
  //   .set({
  //     todoValue: input.value,
  //   });

  firebase
    .database()
    .ref("todos/")
    .push({
      todoValue: input.value,
    })
    .then(() => {
      input.value = "";
    });
};

// get data from realtime database
  // firebase
  // .database()
  // .ref("todos/" + "-OcuHnvpaViPWlA3AJ9l")
  // .on("value", (todoRes) => {
  //   console.log(todoRes.val());
  // });
  


  firebase
  .database()
  .ref("todos/" )
  .on("value", (todoRes) => {
    //
    todoRes.forEach((todo) => {
      console.log(todo.val());
    });
  });




