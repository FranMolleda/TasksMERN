const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const dBConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); //en caso de error de conexion, detener la app
  }
};

module.exports = dBConnect;
