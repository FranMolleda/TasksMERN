const Task = require("../models/Task");
const Project = require("../models/Projects");
const { validationResult } = require("express-validator");

//Crud Crea una nueva tarea
exports.createTask = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extraer el proyecto y comprovar si existe

  const { project } = req.body;

  try {
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ msg: "project not found" });
    }

    //Revisar si el proyecto actual pertenece al usuario autenticado
    if (projectExists.projectAuthor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not allowed" });
    }

    //Creamos la tarea
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("there was an error");
  }
};

//cRud trae todas las tareas por proyecto
exports.getTasks = async (req, res) => {
  try {
    //Extraemos el proyecto
    const { project } = req.body;

    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(401).json({ msg: "project not found" });
    }

    //Revisar si el proyecto actual pertenece al usuario autenticado
    if (projectExists.projectAuthor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not allowed" });
    }

    const tasks = await Task.find({ project });
    res.send({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};
