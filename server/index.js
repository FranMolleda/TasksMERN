const express = require("express");

//Crear servidor
const app = express();

//Crear Puerto de la App
const PORT = process.env.PORT || 4000;

//Arrancar la app
app.listen(PORT, () => {
  console.log(`Server is Running in port ${PORT}`);
});
