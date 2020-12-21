import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
      console.log("Vaciosssssss");
    } else {
      console.log("Completo");
    }
  };

  return (
    <div className="form-usuario">
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
