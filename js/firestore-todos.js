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
// get todos
let dataLoading = document.getElementById("data-loading");
let dataEmpty = document.getElementById("data-empty");
let todoCount = document.getElementById("todoCount");
let todosContainer = document.getElementById("todosContainer");
firebase
  .firestore()
  .collection("todos")
  .onSnapshot((querySnapshot) => {
    dataLoading.style.display = "none";
    todosContainer.innerHTML = "";
    if (querySnapshot.empty) {
   let dataEmpty = `<p id="data-empty" style="display: block">No todos found!</p>`;
      todosContainer.innerHTML = dataEmpty;
    } else {
    
      todoCount.style.display = "block";
      todoCount.innerHTML = `${querySnapshot.size} ${
        querySnapshot.size === 1 ? "Todo" : "Todos"
      }`;
      querySnapshot.forEach((doc) => {
        let todoCard = document.createElement("todo-card");
        todosContainer.appendChild(todoCard);
        todoCard.setAttribute("class", "todo-card");
        let todoHeader = document.createElement("todo-header");
        todoCard.appendChild(todoHeader);
        todoHeader.setAttribute("class", "todo-header");
        let todoTitle = document.createElement("p");
        todoHeader.appendChild(todoTitle);
        todoTitle.setAttribute("class", "todo-title");
        todoTitle.innerHTML = doc.data().title;
        let todoMeta = document.createElement("div");
        todoCard.appendChild(todoMeta);
        todoMeta.setAttribute("class", "todo-meta");
        let todoAuthor = document.createElement("div");
        todoMeta.appendChild(todoAuthor);
        todoAuthor.setAttribute("class", "todo-author");
        let authorAvatar = document.createElement("div");
        todoAuthor.appendChild(authorAvatar);
        authorAvatar.setAttribute("class", "author-avatar");
        authorAvatar.innerHTML = doc.data().email.slice(0, 1).toUpperCase();
        let useEmail = document.createElement("span");
        todoAuthor.appendChild(useEmail);
        useEmail.innerHTML = doc.data().email;
        let createdAt = document.createElement("span");
        todoMeta.appendChild(createdAt);
        createdAt.innerHTML = moment(doc.data().createdAt).format(
          "MMM DD YYYY, h:mm:ss A"
        );
      });
    }
  });

