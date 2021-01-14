const Project = require("../models/Projects");
const { validationResult } = require("express-validator");

//Crud
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

//cRud
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

//crUd
//Actualizar proyecto

exports.updateProject = async (req, res, next) => {
  // Revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Extraer la información de un proyecto
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }
  try {
    // Revisar ID
    let project = await Project.findById(req.params.id);
    // Si el proyecto existe o no
    if (!project) {
      res.status(404).json({ msg: "project not found" });
    }
    // Verificar el creador del proyecto
    if (project.projectAuthor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not allowed" });
    }

    // actualizar

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
    res.json({ project });
  } catch (error) {
    res.status(500).send("Error in server");
  }
};

//Elimina un proyecto por su ID
exports.deleteProject = async (req, res) => {
  try {
    // Revisar ID
    let project = await Project.findById(req.params.id);
    // Si el projecto existe o no
    if (!project) {
      res.status(404).json({ msg: "project not found" });
    }
    // Verificar el creador del proyecto
    if (project.projectAuthor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not allowed" });
    }

    //Eliminar proyecto
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "project deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in server");
  }
};
