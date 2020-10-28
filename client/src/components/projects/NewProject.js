import React, { Fragment, useContext, useState } from "react";
import ContextProject from "../../context/projectsContext/ContextProject";

const NewProject = () => {
  //Obtener el state del formulario
  const contextProject = useContext(ContextProject);
  const { form, showForm, addProject, showError, formerror } = contextProject;

  const [project, setProject] = useState({
    name: "",
  });

  const { name } = project;

  const handleNameProject = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFormProject = (e) => {
    e.preventDefault();

    //Validar proyecto
    if (name === "") {
      showError();
      return;
    }

    //Agregar al state
    addProject(project);

    //Formatear formulario
    setProject({
      name: "",
    });
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >
        New Project
      </button>

      {form ? (
        <form
          className="formulario-nuevo-proyecto"
          onSubmit={handleFormProject}
        >
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={handleNameProject}
          />

          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Add Project"
          />
        </form>
      ) : null}
      {formerror ? (
        <p className="mensaje error">Project Name is required </p>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
