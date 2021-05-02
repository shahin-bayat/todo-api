// SELECTORS
const todoBtn = document.getElementById("todo-submit")
const todoInput = document.getElementById("todo-text")
const todoAssignee = document.getElementById("todo-assignee")
const todosList = document.getElementById("todos")
const todosListDone = document.getElementById("todos-done")

// API CALLS
export const getTodos = async function () {
  const data = await fetch("https://todo-api-migration.herokuapp.com/todo")
  const todos = await data.json()
  return todos
}

export const createTodo = async function (text, assignee, status = "pending") {
  const newTodo = {
    text,
    assignee,
    status,
  }
  await fetch("https://todo-api-migration.herokuapp.com/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(newTodo),
  })
}

export const deleteTodo = async function (id) {
  await fetch(`https://todo-api-migration.herokuapp.com/todo/${id}`, {
    method: "DELETE",
  })
}

export const toggleTodo = async function (id, body) {
  await fetch(`https://todo-api-migration.herokuapp.com/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

// DOM ACTIONS
const removeListElement = function () {
  todoInput.value = ""
  todosList.innerHTML = ""
  todosListDone.innerHTML = ""
}

const fetchAndFillTodos = async function () {
  console.log(getTodos)
  const todos = await getTodos()
  console.log(todos)
  todos.forEach(todo => {
    const todoEl = createTodoElement(todo)

    if (todo.status === "pending") {
      todosList.append(todoEl)
    } else {
      todosListDone.append(todoEl)
    }
  })
}

const createTodoElement = function ({ text, status, assignee, id }) {
  const todoEl = document.createElement("li")
  todoEl.classList.add(`list-group-item`, "d-flex", "align-items-center")
  // status === "done" && todoEl.classList.add(`disabled`)

  const checkBox = document.createElement("input")
  checkBox.classList.add("ms-2")
  checkBox.setAttribute("type", "checkbox")
  checkBox.addEventListener("change", () => toggleTodo(id, { status: "done" }))

  const todoText = document.createElement("span")
  todoText.classList.add("flex-grow-1")
  todoText.append(text)
  if (status === "done") todoText.classList.add("done")

  const todoAssignee = document.createElement("span")
  todoAssignee.append(assignee)
  todoAssignee.classList.add("badge", "rounded-fill")
  assignee == "شاهین" && todoAssignee.classList.add("bg-primary")
  assignee == "شادی" && todoAssignee.classList.add("bg-warning")
  assignee == "مشترک" && todoAssignee.classList.add("bg-secondary")

  const deleteButton = document.createElement("img")
  deleteButton.setAttribute("src", "public/remove.svg")
  deleteButton.classList.add("me-1", "delete-btn")
  deleteButton.addEventListener("click", () => deleteTodo(id))

  status !== "done" && todoEl.append(checkBox)
  todoEl.append(todoText)
  todoEl.append(todoAssignee)
  todoEl.append(deleteButton)

  return todoEl
}

// EVENT LISTENERS
window.addEventListener("load", function () {
  todosList.classList.add("list-group")
  todosListDone.classList.add("list-group")
  fetchAndFillTodos()
})

todoBtn.addEventListener("click", async function (e) {
  e.preventDefault()
  if (todoInput.value.trim()) {
    await createTodo(todoInput.value, todoAssignee.value)
    removeListElement()
    fetchAndFillTodos()
  }
})
