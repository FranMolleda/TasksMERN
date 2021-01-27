import React, { useReducer } from "react";
import taskContext from "./ContextTasks";
import ReducerTasks from "./ReducerTasks";

import {
  TASKS_PROJECT,
  ADD_TASKS,
  TASK_VALIDATE,
  TASK_DELETE,
  TASK_CHANGE,
  ACTUAL_TASK,
  UPDATE_TASK,
} from "../../types";

import axiosClient from "../../config/axios";

const TasksContext = (props) => {
  const initialState = {
    tasksproject: [],
    taskerror: false,
    taskselected: null,
  };

  const [state, dispatch] = useReducer(ReducerTasks, initialState);

  //Crear funciones

  //Obtener Tareas
  const getTasks = (projectId) => {
    dispatch({
      type: TASKS_PROJECT,
      payload: projectId,
    });
  };

  //Agregar Tareas al proyecto seleccionado
  const addTasks = async (task) => {
    console.log(task);
    try {
      const result = await axiosClient.post("/api/tasks", task);
      console.log(result);
      dispatch({
        type: ADD_TASKS,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida y muestra un error en caso de que sea necesario
  const taskValidate = () => {
    dispatch({
      type: TASK_VALIDATE,
    });
  };

  //Eliminar tarea por su id
  const deleteTask = (id) => {
    dispatch({
      type: TASK_DELETE,
      payload: id,
    });
  };

  //Camba el estado de cara tarea
  const changeStateTask = (task) => {
    dispatch({
      type: TASK_CHANGE,
      payload: task,
    });
  };

  //Extrae y guardar una tarea para editar
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  //Editar una tarea
  const updateTask = (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };

  return (
    <taskContext.Provider
      value={{
        tasksproject: state.tasksproject,
        taskerror: state.taskerror,
        taskselected: state.taskselected,
        getTasks,
        addTasks,
        taskValidate,
        deleteTask,
        changeStateTask,
        saveActualTask,
        updateTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TasksContext;
