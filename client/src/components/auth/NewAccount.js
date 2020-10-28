import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewAccount = () => {
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
    if (email.trim() === "" || password.trim() === "") {
      console.log("Vaciosssssss");
    } else {
      console.log("Completo");
    }

    // Password mínimo 6 caracteres

    // Los 2 password sean iguales

    // Pasarlo a Action
  };

  return (
    <div className="form-usuario">
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
