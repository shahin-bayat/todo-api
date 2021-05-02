export const getTodos = async function () {
  // const todos = await db.collection("todos").orderBy("created_at", "desc").get()
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
  removeListElement()
  fetchAndFillTodos()
}

export const toggleTodo = async function (id) {
  await db
    .collection("todos")
    .doc({ id })
    .update({ status: "done", created_at: new Date().toLocaleString() })
  removeListElement()
  fetchAndFillTodos()
}
