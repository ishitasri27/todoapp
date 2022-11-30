const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000; 

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id/:type", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    complete: req.params.type,
  });
  //   todo.complete = !todo.complete;
  //   todo.save();
  res.json(todo);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
