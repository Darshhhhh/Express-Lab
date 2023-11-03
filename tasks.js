const express = require("express");
const router = express.Router();
const tasks = [];

router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, id } = req.body;
  if (!title || !description) {
    res.status(400).send({
      message: "Please Fill All the Details!",
      success: false,
    });
  } else {
    const task = { title, description, id };
    tasks.push(task);
    res.status(201).send({
      success: true,
      message: "New Task Added Successfully!",
      data: tasks,
    });
  }
});
router.delete("/", (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send({
      message: "Please Enter ID!",
      success: false,
    });
  } else {
    const dataToDelete = tasks.findIndex((obj) => obj.id === id);
    if (dataToDelete !== -1) {
      tasks.splice(dataToDelete, 1);
      res.status(201).send({
        success: true,
        message: `Object with ID ${id} has been deleted.`,
        data: tasks,
      });
    } else {
      res.status(404).send({
        success: false,
        message: `Object with ID ${id} not found.`,
        data: tasks,
      });
    }
  }
});

router.put("/", (req, res) => {
  const { id, title, description } = req.body;
  if (!id) {
    res.status(400).send({
      message: "Please Enter ID!",
      success: false,
    });
  } else {
    const updatedData = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, title: title, description: description };
      } else {
        return item;
      }
    });
    if (updatedData === tasks) {
      res.status(404).send({
        success: false,
        message: `Object with ID ${id} not found.`,
        data: tasks,
      });
    } else {
      data = updatedData;
      res.status(200).send({
        success: true,
        message: `Object with ID ${id} is Updated.`,
        data: data,
      });
    }
  }
});

module.exports = router;
