const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/tasks

//Crud
router.post(
  "/",
  auth,
  [
    check("taskName", "Task name is required").not().isEmpty(),
    check("project", "project is required").not().isEmpty(),
  ],
  taskController.createTask
);

//cRud
router.get("/", auth, taskController.getTasks);

//CrUd
router.put("/:id", auth, taskController.updateTask);

module.exports = router;
