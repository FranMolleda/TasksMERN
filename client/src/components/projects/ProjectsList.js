import React, { useContext, useEffect } from "react";
import OneProject from "./OneProject";
import projectContext from "../../context/projectsContext/ContextProject";
import AlertContext from "../../context/alertsContext/alertContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {
  const alertContext = useContext(AlertContext);
  const { message, projects, getProjects } = useContext(projectContext);

  const { alert, showAlert } = alertContext;

  //Obtener proyectos cuando carga el componente
  useEffect(() => {
    //Si hay un error
    if (message) {
      showAlert(message.msg, message.cathegory);
    }
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (projects.length === 0) {
    setTimeout(() => {
      return <p className="mensaje error">Add your Projects</p>;
    }, 500);
  }

  return (
    <ul className="listado-proyectos">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <TransitionGroup>
        {projects.map((oneProject) => {
          return (
            <CSSTransition
              timeout={500}
              classNames="proyecto"
              key={oneProject._id}
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
