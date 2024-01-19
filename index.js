//Creating a todo list server

const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json);

let todoList = [];

//endpoint to fetch all the todo items
app.get("/todos", (req, res) => {
  res.json(todoList);
});

//endpoint to fetch a particular todo item by id
//point id is sent in the request params
app.get("todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

//endpoint to store a todo in the server
//by creating a new Todo object
app.post("/todos", (req, res) => {
  //create a new todo object
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  todoList.push(newTodo);
  res.status(201).json(newTodo);
});

//update a particular todo item by id
app.put("/todos/:id", (req, res) => {
  const todoIndex = todoList.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todoList[todoIndex].title = req.body.title;
    todoList[todoIndex].description = req.body.description;
    res.json(todoList[todoIndex]);
  }
});

//delete a particular todo by id
app.delete("/todos/:id", (req, res) => {
  const todoIndex = todoList.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todoList.splice(todoIndex, 1);
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000, () => {});
