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
    todoCount.style.display = "none";
    
    let counter = 0;
    if (todoRes.val()) {
      todosContainer.innerHTML = "";
      todoCount.style.display = "block";
      todoRes.forEach((todo) => {
        counter++;

        let todoCard = document.createElement("todo-card");
        todosContainer.appendChild(todoCard);
        todoCard.setAttribute("class", "todo-card");
        let todoHeader = document.createElement("todo-header");
        todoCard.appendChild(todoHeader);
        todoHeader.setAttribute("class", "todo-header");
        let todoTitle = document.createElement("p");
        todoHeader.appendChild(todoTitle);
        todoTitle.setAttribute("class", "todo-title");
        todoTitle.innerHTML = todo.val().title;
        let todoMeta = document.createElement("div");
        todoCard.appendChild(todoMeta);
        todoMeta.setAttribute("class", "todo-meta");
        let todoAuthor = document.createElement("div");
        todoMeta.appendChild(todoAuthor);
        todoAuthor.setAttribute("class", "todo-author");
        let authorAvatar = document.createElement("div");
        todoAuthor.appendChild(authorAvatar);
        authorAvatar.setAttribute("class", "author-avatar");
        authorAvatar.innerHTML = todo.val().email.slice(0, 1).toUpperCase();
        let useEmail = document.createElement("span");
        todoAuthor.appendChild(useEmail);
        useEmail.innerHTML = todo.val().email;
        let createdAt = document.createElement("span");
        todoMeta.appendChild(createdAt);
        createdAt.innerHTML = moment(todo.val().createdAt).format(
          "MMM DD YYYY, h:mm:ss A"
        );
      });
      todoCount.innerHTML = `${counter} ${counter === 1 ? "Todo" : "Todos"}`;
    } else {
      dataEmpty.style.display = "block";
    }
  });
