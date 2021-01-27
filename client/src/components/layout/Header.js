import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";

const Header = () => {
  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { user, authUser, logOut } = authContext;

  //UseEffect
  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hola <span> {user.name} </span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => logOut()}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Header;
