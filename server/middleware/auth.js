const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token del Header

  const token = req.header("x-auth-token");

  //Revisar si no hay token

  if (!token) {
    return res.status(401).json({ msg: "there are not token" });
  }

  //Validar Token
  try {
    const encryption = jwt.verify(token, process.env.SECRET);
    req.user = encryption.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
