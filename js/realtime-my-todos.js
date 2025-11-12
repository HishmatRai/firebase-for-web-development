let email;
firebase.auth().onAuthStateChanged((user) => {
  email = user.email;
});
let todoTitle = document.getElementById("todoTitle");
let addBtn = document.getElementById("addBtn");
let message = document.getElementById("message");
// add todos
const addTodoHandler = () => {
  addBtn.innerHTML = "Loading ...";
  message.style.display = "block";
  firebase
    .database()
    .ref("todos/")
    .push({
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

// get todos
let dataLoading = document.getElementById("data-loading");
let dataEmpty = document.getElementById("data-empty");
let todoCount = document.getElementById("todoCount");
let todosContainer = document.getElementById("todosContainer");
firebase
  .database()
  .ref("todos/")
  .on("value", (todoRes) => {
    dataLoading.style.display = "none";
    let curreentUserTodos = false;
    todoCount.style.display = "none";

    let counter = 0;
    if (todoRes.val()) {
      todosContainer.innerHTML = "";
      todoCount.style.display = "block";
      todoRes.forEach((todo) => {
        if (todo.val().email === email) {
          curreentUserTodos = true;
          counter++;
          const card = document.createElement("div");
          card.className = "todo-card";
          card.innerHTML = `
    <div class="todo-header">
      <p class="todo-title">${todo.val().title}</p>
      <div class="todo-actions">
        <button class="btn-action btn-edit" onclick="editHandler('${
          todo.key
        }')">Edit</button>
        <button class="btn-action btn-delete" onclick="deleteHandler('${
          todo.key
        }')">Delete</button>
      </div>
    </div>
    <div class="todo-meta">
      <span>Created: ${moment(todo.val().createdAt).format(
        "MMM DD YYYY, h:mm:ss A"
      )}</span>
    </div>
  `;

          todosContainer.appendChild(card);
        }
      });
      if (!curreentUserTodos) {
        console.log("No todos found!");
        // dataEmpty.style.display = "block";
      }

      todoCount.innerHTML = `${counter} ${counter === 1 ? "Todo" : "Todos"}`;
    } else {
      dataEmpty.style.display = "block";
    }
  });

// edit function
const editHandler = (key) => {
  console.log("edit handler", key);
  let newTitle = prompt("Enter new title", "");
  firebase
    .database()
    .ref("todos/" + key)
    .update({
      title: newTitle,
    });
};

// delete function
const deleteHandler = (key) => {
  firebase
    .database()
    .ref("todos/" + key)
    .remove();
};
