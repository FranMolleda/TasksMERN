import React, { useContext } from "react";
import tasksContext from "../../context/tasksContext/ContextTasks";
import projectContext from "../../context/projectsContext/ContextProject";

const Tasks = ({ oneTask }) => {
  const { getTasks, deleteTask, changeStateTask, saveActualTask } = useContext(
    tasksContext
  );

  const constextList = useContext(projectContext);
  const { project } = constextList;

  const [actualProject] = project;

  //Funcion para borrar tarea
  const handleDeleteTask = (id) => {
    deleteTask(id);
    getTasks(actualProject.id);
  };

  //Función que cambia el estado de las tareas
  const changTaskState = (oneTask) => {
    if (oneTask.state) {
      oneTask.state = false;
    } else {
      oneTask.state = true;
    }
    changeStateTask(oneTask);
  };

  //Agrega una tarea actual cuando el usuario quiere editarla
  const selectTask = (Task) => {
    saveActualTask(Task);
  };

  return (
    <li className="tarea sombra">
      <p>{oneTask.name}</p>

      <div className="estado">
        {oneTask.state ? (
          <button
            type="button"
            className="completo"
            onClick={() => changTaskState(oneTask)}
          >
            Complete
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => changTaskState(oneTask)}
          >
            Incomplete
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(oneTask)}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-eliminar"
          onClick={() => handleDeleteTask(oneTask.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Tasks;
