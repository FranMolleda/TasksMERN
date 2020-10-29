const express = require("express");
const dBConnect = require("./config/db");

//Crear servidor
const app = express();

//Conectar a la DB
dBConnect();

// Habilitar express.json
app.use(express.json({ extended: true }));

//Crear Puerto de la App
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use("/api/users", require("./routes/userRoute"));

//Arrancar la app
app.listen(PORT, () => {
  console.log(`Server is Running in port ${PORT}`);
});
