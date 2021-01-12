import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";

const Header = () => {
  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { AuthUser, user } = authContext;

  useEffect(() => {
    AuthUser();
  }, []);
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola
        {user ? <span> {user.name} </span> : null}
      </p>
      <nav className="nav-principal">
        <a href="#!">Log Out</a>
      </nav>
    </header>
  );
};

export default Header;
