const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const selectUserByEmail = require("../../repositories/users/selectUserByEmail");
const loginUserSchema = require("../../schemas/users/loginUserSchema");
const generateError = require("../../utils/generateError");

const loginUser = async (req, res, next) => {
  try {
    //Validamos el body y nos traemos el email y la password
    await loginUserSchema.validateAsync(req.body);
    const { email, password } = req.body;

    //Seleccionamos a ese usuario en la BBDD y si no existe lanzamos un error
    const user = await selectUserByEmail(email);

    if (!user) {
      generateError("Email o contraseña incorrectos", 400);
    }

    //Comparamos la contraseña con la encriptada que hay en la bbdd para verificar que son la misma. Si no lo son lanzamos un error
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      generateError("Email o contraseña incorrectos", 400);
    }

    //Creamos el payLoad para guardar datos en el token
    const tokenPayload = { id: user.id };

    //Generamos un token y se lo enviamos al cliente
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ status: "Sesión iniciada", data: { token } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
