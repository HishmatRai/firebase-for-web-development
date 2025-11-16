let email;
// get todos
let dataLoading = document.getElementById("data-loading");
let todoCount = document.getElementById("todoCount");
let todosContainer = document.getElementById("todosContainer");
firebase.auth().onAuthStateChanged((user) => {
  email = user.email;
  firebase
    .firestore()
    .collection("todos")
    .where("email", "==", email)
    .onSnapshot((querySnapshot) => {
      dataLoading.style.display = "none";
        todoCount.style.display = "none";
      todosContainer.innerHTML = "";
      if (querySnapshot.empty) {
        let dataEmpty = `<p id="data-empty" style="display: block">No todos found!</p>`;
        todosContainer.innerHTML = dataEmpty;
      } else {
        todoCount.style.display = "block";
        todoCount.innerHTML = `${querySnapshot.size} ${
          querySnapshot.size === 1 ? "Todo" : "Todos"
        }`;
        console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          const card = document.createElement("div");
          card.className = "todo-card";
          card.innerHTML = `
    <div class="todo-header">
      <p class="todo-title">${doc.data().title}</p>
      <div class="todo-actions">
        <button class="btn-action btn-edit" onclick="editHandler('${
          doc.id
        }')">Edit</button>
        <button class="btn-action btn-delete" onclick="deleteHandler('${
          doc.id
        }')">Delete</button>
      </div>
    </div>
    <div class="todo-meta">
      <span>Created: ${moment(doc.data().createdAt).format(
        "MMM DD YYYY, h:mm:ss A"
      )}</span>
    </div>
  `;
          todosContainer.appendChild(card);
        });
      }
    });
});
let todoTitle = document.getElementById("todoTitle");
let addBtn = document.getElementById("addBtn");
let message = document.getElementById("message");
// add todos
const addTodoHandler = () => {
  addBtn.innerHTML = "Loading ...";
  message.style.display = "block";
  firebase
    .firestore()
    .collection("todos")
    .add({
      title: todoTitle.value,
      email: email,
      createdAt: moment().format(),
    })
    .then(() => {
      todoTitle.value = "";
      message.innerHTML = "Todo added successfully";
      message.setAttribute("class", "success");
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.setAttribute("class", "error");
    })
    .finally(() => {
      addBtn.innerHTML = "Add Todo";
      setTimeout(() => {
        message.style.display = "none";
      }, 2000);
    });
};

// edit function
const editHandler = (id) => {
  let newTitle = prompt("Enter new title", "");

  firebase.firestore().collection("todos").doc(id).update({
    title: newTitle,
  });
};

// delete function
const deleteHandler = (id) => {
  firebase.firestore().collection("todos").doc(id).delete();
};
