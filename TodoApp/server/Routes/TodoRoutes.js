const express = require("express");
const router = express.Router();

const Todo = require("../Models/Todo");

router.get("/test", (req, res) => {
  res.json({
    message: "The Todo Routes API is working",
  });
});

router.post("/createtodo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newtodo = new Todo({
      title,
      description,
    });
    await newtodo.save();
    res.status(201).json({
      message: "Todo created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.mesage,
    });
  }
});

router.get("/getalltodos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos,
      message: "Todos fetched successfuly",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/gettodo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      todo,
      message: "Todo fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/updatetodo/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      { new: true }
    );

    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      todo,
      message: "Todo updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/deletetodo/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
