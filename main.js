import { createTodo, deleteTodo, getTodos, toggleTodo } from "./api"

// SELECTORS
const todoBtn = document.getElementById("todo-submit")
const todoInput = document.getElementById("todo-text")
const todoAssignee = document.getElementById("todo-assignee")
const todosList = document.getElementById("todos")
const todosListDone = document.getElementById("todos-done")

// DOM ACTIONS
const removeListElement = function () {
  todoInput.value = ""
  todosList.innerHTML = ""
  todosListDone.innerHTML = ""
}

const fetchAndFillTodos = async function () {
  const todos = await getTodos()
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
  checkBox.addEventListener("change", () => toggleTodo(id))

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
