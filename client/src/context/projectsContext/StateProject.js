import React, { useReducer } from "react";

import projectContext from "./ContextProject";
import ReducerProject from "./ReducerProject";

import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  PROJECT_ERROR,
  FORM_VALIDATE,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types";

import axiosClient from "../../config/axios";

const StateProject = (props) => {
  const initialState = {
    projects: [],
    form: false,
    formerror: false,
    project: null,
    message: null,
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
  const getProjects = async () => {
    try {
      const result = await axiosClient.get("/api/projects");
      dispatch({
        type: GET_PROJECTS,
        //el array que hemos declarado de proyectos va a ser el payload
        payload: result.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        cathegory: "alerta-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
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
      const alert = {
        msg: "There was an error",
        cathegory: "alerta-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
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
  const deleteTask = async (projectId) => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        cathegory: "alerta-error",
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        formerror: state.formerror,
        project: state.project,
        message: state.message,
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
