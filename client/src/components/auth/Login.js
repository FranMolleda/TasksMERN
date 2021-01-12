import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alertsContext/alertContext";
import AuthContext from "../../context/authContext/authContext";

const Login = (props) => {
  // Extraemos los valores del Context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { message, authenticated, sessionInit } = authContext;

  //En caso de que el password o usuario no exista
  useEffect(() => {
    if (authenticated) {
      props.history.push("/projects");
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
  }, [message, authenticated, props.history]);

  //State para iniciar sesion
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacíos
    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required", "alerta-error");
    }

    //Pasarlo al action
    sessionInit({ email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form onSubmit={handleLoginForm}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              //id debe ser igual que el htmlFor del label para que al hacer click en label se habilite el input
              id="email"
              //name es lo que vamos a leer para colocarlo en el estado
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Login"
            />
          </div>
        </form>
        <Link to={"/new-account"} className="enlace-cuenta">
          Get Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
