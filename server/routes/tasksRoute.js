const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/tasks

router.post(
  "/",
  auth,
  [
    check("taskName", "Task name is required").not().isEmpty(),
    check("project", "project is required").not().isEmpty(),
  ],
  taskController.createTask
);
module.exports = router;
