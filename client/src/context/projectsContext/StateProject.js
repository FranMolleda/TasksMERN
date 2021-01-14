import React, { useReducer } from "react";

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

import axiosClient from "../../config/axios";

const StateProject = (props) => {
  const projects = [
    { _id: 1, name: "Virtual Shop" },
    { _id: 2, name: "Otro diferente" },
    { _id: 3, name: "Otro más" },
    { _id: 4, name: "Y Otro más" },
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
  const addProject = async (project) => {
    console.log(project);
    try {
      const consult = await axiosClient.post("/api/projects", project);
      console.log(consult.data);
      dispatch({
        type: ADD_PROJECT,
        payload: consult.data,
      });
    } catch (error) {
      console.log(error);
    }
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
