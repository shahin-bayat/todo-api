"use strict"

const express = require("express")
const path = require("path")
const { getTodos, addTodo, deleteTodo, finishTodo } = require("./db")

const app = express()

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
