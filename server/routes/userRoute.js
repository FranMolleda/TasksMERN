//Rutas para crear usuarios

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

//Crea un usuario
// api/users
//userController.createUser viene de userController, que lo hemos difinido aquí y .createUser del export de ../controllers/userController
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Insert your Email").isEmail(),
    check("password", "Password must be min. 6 Characters").isLength({
      min: 6,
    }),
  ],

  userController.createUser
);

module.exports = router;
