const Project = require("../models/Projects");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Crear un nuevo proyecto
    const project = new Project(req.body);

    //Guardar el autor via JWT
    project.projectAuthor = req.user.id;

    //Guardamos el proyecto
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//Obtiene todos los proyectos del usuario actual

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ projectAuthor: req.user.id });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};
