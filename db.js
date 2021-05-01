"use strict"

const fs = require("fs")
const path = require("path")

const db = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db.json"), function (err, data) {
    if (err) {
      return
    }
    return data
  })
)

const getTodos = function () {
  return db
}

const addTodo = function (text, assignee, status = "pending") {
  const newTodo = {
    text,
    assignee,
    status,
    created_at: new Date().toLocaleString(),
    id: new Date().getTime().toString(),
  }
  db.push(newTodo)
}

const deleteTodo = async function (id) {
  await db.filter(todo => todo.id !== id)
}

const finishTodo = function (id) {
  const todo = db.find(todo => todo.id === id)
  todo.status = "done"
}

module.exports = { addTodo, getTodos, deleteTodo, finishTodo }
