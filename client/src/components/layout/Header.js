import React from "react";

const Header = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola <span>Fran</span>
      </p>
      <nav className="nav-principal">
        <a href="#!">Log Out</a>
      </nav>
    </header>
  );
};

export default Header;
