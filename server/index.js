const express = require("express");
const dbConnect = require("./config/db");

//Crear servidor
const app = express();

//Conectar a la DB
dbConnect();

// Habilitar express.json
app.use(express.json({ extended: true }));

//Crear Puerto de la App
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/projects", require("./routes/projectsRoute"));
app.use("/api/tasks", require("./routes/tasksRoute"));

//Arrancar la app
app.listen(PORT, () => {
  console.log(`Server is Running in port ${PORT}`);
});
