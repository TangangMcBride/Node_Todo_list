const { error } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("Hello, World");
});
app.get("/todos", (req, res) => {
  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("they was an Error");
    }
    const todos = JSON.parse(data);
    return res.json({ todos: todos });
  });
});

app.put("./todos:id/complete", (req, res) => {
  const id = res.params.id;

  const findTodobyID = (todos, id) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        return i;
      }
    }
    return -1
  };

  fs.readFile("./store/todos.json", "utf-8", (req, res) => {
    if (err) {
      return res.status(500).send("Something went Wrong");
    }
    const todos = JSON.parse(data);
    const todosIndex  = f
  });
});

app.listen(3000, () => {
  console.log("App running on localhost 3000");
});
