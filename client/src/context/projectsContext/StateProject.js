import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import projectContext from "./ContextProject";
import ReducerProject from "./ReducerProject";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  FORM_VALIDATE,
  ACTUAL_PROJECT,
  DELETE_TASK,
} from "../../types";

const StateProject = (props) => {
  const projects = [
    { id: 1, name: "Virtual Shop" },
    { id: 2, name: "Otro diferente" },
    { id: 3, name: "Otro más" },
    { id: 4, name: "Y Otro más" },
  ];
  const initialState = {
    projects: [],
    form: false,
    formerror: false,
    project: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ReducerProject, initialState);

  //Serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  //Obtener los proyectos
  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      //el array que hemos declarado de proyectos va a ser el payload
      payload: projects,
    });
  };

  //Añadir nuevo proyecto
  const addProject = (project) => {
    project.id = uuidv4();
    dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };

  //Validar formulario por errores
  const showError = () => {
    dispatch({
      type: FORM_VALIDATE,
    });
  };

  //Selecciona el projecto que el usuario clicó
  const actualProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  //Eliminar Task
  const deleteTask = (projectId) => {
    dispatch({
      type: DELETE_TASK,
      payload: projectId,
    });
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        formerror: state.formerror,
        project: state.project,
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteTask,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default StateProject;
