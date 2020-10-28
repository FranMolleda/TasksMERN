import React, { useReducer } from "react";
import taskContext from "./ContextTasks";
import ReducerTasks from "./ReducerTasks";

import { v4 as uuidv4 } from "uuid";

import {
  TASKS_PROJECT,
  ADD_TASKS,
  TASK_VALIDATE,
  TASK_DELETE,
  TASK_CHANGE,
  ACTUAL_TASK,
  UPDATE_TASK,
} from "../../types";

const TasksContext = (props) => {
  const initialState = {
    tasks: [
      { id: 1, name: "Choose Platform", state: true, projectId: 1 },
      { id: 2, name: "Choose Color", state: false, projectId: 2 },
      { id: 3, name: "Choose Pay Platform", state: true, projectId: 3 },
      { id: 4, name: "Choose Hosting", state: false, projectId: 4 },
      { id: 5, name: "Choose Platform", state: true, projectId: 1 },
      { id: 6, name: "Choose Color", state: false, projectId: 2 },
      { id: 7, name: "Choose Pay Platform", state: true, projectId: 3 },
      { id: 8, name: "Choose Platform", state: true, projectId: 4 },
      { id: 9, name: "Choose Color", state: false, projectId: 2 },
      { id: 10, name: "Choose Pay Platform", state: true, projectId: 1 },
      { id: 11, name: "Choose Platform", state: true, projectId: 3 },
      { id: 12, name: "Choose Color", state: false, projectId: 4 },
      { id: 13, name: "Choose Pay Platform", state: true, projectId: 2 },
    ],
    tasksproject: null,
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
  const addTasks = (task) => {
    task.id = uuidv4();
    dispatch({
      type: ADD_TASKS,
      payload: task,
    });
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
        tasks: state.tasks,
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
