import React, { Fragment, useContext } from "react";
import Tasks from "./Tasks";
import projectContext from "../../context/projectsContext/ContextProject";
import tasksContext from "../../context/tasksContext/ContextTasks";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = () => {
  const constextList = useContext(projectContext);
  const contextTasksList = useContext(tasksContext);

  const { project, deleteTask } = constextList;
  const { tasksproject } = contextTasksList;

  if (!project) return <h2>Select a Project</h2>;
  //Array destructuring para extraer el proyecto
  const [ActualProyect] = project;

  return (
    <Fragment>
      <h2>Project: {ActualProyect.name}</h2>

      <ul className="listado-tareas">
        {tasksproject.length === 0 ? (
          <li className="tarea">
            <p>There are not Tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {tasksproject.map((oneTask, i) => {
              return (
                <CSSTransition key={i} timeout={500} classNames="tarea">
                  <Tasks oneTask={oneTask} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => deleteTask(ActualProyect.id)}
      >
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default TaskList;
