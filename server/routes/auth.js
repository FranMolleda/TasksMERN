//Rutas autenticación

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControler = require("../controllers/authController");

//Crea Usuario
//api/auth

router.post("/", [
  check("email", "Insert your Email").isEmail(),
  check("password", "Password must be min. 6 Characters").isLength({
    min: 6,
  }),
  authControler.authenticateUser,
]);

module.exports = router;
