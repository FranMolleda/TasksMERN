import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projectsContext/ContextProject";
import tasksContext from "../../context/tasksContext/ContextTasks";

const TaskForm = () => {
  const constextList = useContext(projectContext);
  const { project } = constextList;
  const {
    taskerror,
    addTasks,
    taskValidate,
    getTasks,
    taskselected,
    updateTask,
  } = useContext(tasksContext);

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (taskselected !== null) {
      setTask(taskselected);
    } else {
      setTask({
        name: "",
      });
    }
    // eslint-disable-next-line
  }, [taskselected]);

  const [task, setTask] = useState({
    name: "",
  });

  const { name } = task;

  if (!project) return null;
  const [ActualProyect] = project;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (name.trim() === "") {
      taskValidate();
      return;
    }

    //Si es edicion o nueva tarea
    if (taskselected === null) {
      //Agregar la tarea al state de tareas
      task.project = ActualProyect._id;
      addTasks(task);
    } else {
      //actualizar tarea existente
      updateTask(task);
    }

    //Obtener y filtrar las tareas del proyecto
    getTasks(ActualProyect.id);

    //Reiniciar el formulario
    setTask({
      name: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskselected ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>
      {taskerror ? <p className="mensaje error">Task name is empty</p> : null}
    </div>
  );
};

export default TaskForm;
