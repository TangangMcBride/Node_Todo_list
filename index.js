const { error } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});
app.get("/todos", (req, res) => {
  const showpending = req.query.showpending;

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("they was an Error");
    }
    const todos = JSON.parse(data);

    if (showpending !== "1") {
      return res.json({ todos: todos });
    } else {
      return res.json({
        todos: todos.filter((t) => {
          return t.complete === false;
        }),
      });
    }
  });
});

app.put("/todos/:id/complete", (req, res) => {
  const id = req.params.id;

  const findTodobyID = (todos, id) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === parseInt(id)) {
        return i;
      }
    }
    return -1;
  };

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Something went Wrong");
    }
    let todos = JSON.parse(data);
    const todosIndex = findTodobyID(todos, id);

    if (todosIndex === -1) {
      return res.status(404).send("Sorry Response not found");
    }
    todos[todosIndex].complete = true;

    fs.writeFile("./store/todos.json", JSON.stringify(todos), () => {
      return res.json({ success: "200" });
    });
  });
});
app.post("/todo", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("No Task added");
  }
  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("something went wrong");
    }
    const todos = JSON.parse(data);
    const maxId = Math.max.apply(
      Math,
      todos.map((t) => {
        return t.id;
      })
    );
    todos.push({
      id: maxId + 1,
      complete: false,
      name: req.body.name,
    });

    fs.writeFile("./store/todos.json", JSON.stringify(todos), () => {
      return res.json({ success: "200" });
    });
  });
});
app.listen(3000, () => {
  console.log("App running on localhost 3000");
});
