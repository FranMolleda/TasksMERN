import React, { useContext, useEffect } from "react";
import OneProject from "./OneProject";
import projectContext from "../../context/projectsContext/ContextProject";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ProjectsList = () => {
  const { projects, getProjects } = useContext(projectContext);

  //Obtener proyectos cuando carga el componente
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (projects.length === 0) {
    setTimeout(() => {
      return <p className="mensaje error">Add your Projects</p>;
    }, 500);
  }

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {projects.map((oneProject) => {
          return (
            <CSSTransition
              timeout={500}
              classNames="proyecto"
              key={oneProject.id}
            >
              <OneProject oneProject={oneProject} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
