const express = require("express");
const dBConnect = require("./config/db");

//Crear servidor
const app = express();

//Conectar a la DB
dBConnect();

//Crear Puerto de la App
const PORT = process.env.PORT || 4000;

//Arrancar la app
app.listen(PORT, () => {
  console.log(`Server is Running in port ${PORT}`);
});
