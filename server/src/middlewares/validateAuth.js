const jwt = require("jsonwebtoken");
const generateError = require("../utils/generateError");

//Función que valida al usuario
const validateAuth = (req, res, next) => {
  try {
    //Nos traemos el header authorization, si no la hay se lanza un error
    const { authorization } = req.headers;

    if (!authorization) {
      generateError("Missing authorization header", 400);
    }

    //Separamos el tipo de token y el token
    const [type, token] = authorization.split(" ");

    //En caso de que el token no sea Bearer Token o no exista se lanza un error
    if (type !== "Bearer" || !token) {
      generateError("Invalid token format", 400);
    }

    //Verificamos que el token sea válido
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    //Guardamos los datos del user que había en el token, entre ellos el id del user que ha iniciado sesión
    req.auth = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
