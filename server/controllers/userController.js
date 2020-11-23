const User = require("../models/Users");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
  //extraer email y password

  const { email, password } = req.body;
  try {
    //Revisar que el usuario sea unico
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User exists" });
    }
    //Crea el nuevo usuario
    user = new User(req.body);

    //Hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //Guardar Usuario
    await user.save();
    //Mensaje de confirmación
    res.json({ msg: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error");
  }
};
