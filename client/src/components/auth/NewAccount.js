import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alertsContext/alertContext";
import AuthContext from "../../context/authContext/authContext";

const NewAccount = (props) => {
  // Extraemos los valores del AlertContext
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { message, authenticated, userRegister } = authContext;

  //En caso de que el usuario se haya autenticado, registrado o sea un registro
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    if (message) {
      showAlert(message.msg, message.cathegory);
    }
  }, [message, authenticated, props.history]);
  //State para iniciar sesion
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { name, email, password, confirm } = user;

  const handleLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("All fields are required", "alerta-error");
      return; //debemos poner el return para que no se ejecute la siguiente linea
    }

    // Password mínimo 6 caracteres
    if (password.length < 6) {
      showAlert("Password must be at least 6 characters", "alerta-error");
      return;
    }
    // Los 2 password sean iguales
    if (password !== confirm) {
      showAlert("Paswords are diferents", "alerta-error");
      return;
    }
    // Pasarlo a Action
    userRegister({
      name,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Register</h1>

        <form onSubmit={handleLoginForm}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleLogin}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleLogin}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleLogin}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={confirm}
              placeholder="Confirm Password"
              onChange={handleLogin}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
