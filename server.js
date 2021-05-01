"use strict"

const express = require("express")
const path = require("path")
const { getTodos, addTodo, deleteTodo, finishTodo } = require("./db")

const app = express()

app.get("/", (req, res) => res.send("hello world"))

const PORT = 3000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
