//Rutas autenticación

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControler = require("../controllers/authController");
const auth = require("../middleware/auth");

//Iniciar Sesion
//api/auth

router.post("/", [
  check("email", "Insert your Email").isEmail(),
  check("password", "Password must be min. 6 Characters").isLength({
    min: 6,
  }),
  authControler.authenticateUser,
]);

//Obtiene el usuario autenticado
router.get("/", auth, authControler.authenticateUser);

module.exports = router;
