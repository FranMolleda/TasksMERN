import React, { useContext } from "react";
import projectContext from "../../context/projectsContext/ContextProject";
import tasksContext from "../../context/tasksContext/ContextTasks";

const OneProject = ({ oneProject }) => {
  const constextList = useContext(projectContext);
  const contextTasksList = useContext(tasksContext);

  const { actualProject } = constextList;
  const { getTasks } = contextTasksList;

  //Funcion para agregar proyecto actual
  const projectSelect = (id) => {
    actualProject(id); //Fijar un proyecto actual
    getTasks(id); //Filtar las tareas al dar click
  };

  return (
    <li>
      <button
        className="btn btn-blank"
        type="button"
        onClick={() => projectSelect(oneProject._id)}
      >
        {oneProject.name}
      </button>
    </li>
  );
};

export default OneProject;
