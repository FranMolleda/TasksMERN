import React, { useContext, useEffect } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import TaskForm from "../tasks/TaskForm";
import TaskList from "../tasks/TaskList";
import AuthContext from "../../context/authContext/authContext";

const Projects = () => {
  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { AuthUser } = authContext;

  useEffect(() => {
    AuthUser();
  }, []);
  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Header />
        <main>
          <TaskForm />
          <div className="contenedor-tareas">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
