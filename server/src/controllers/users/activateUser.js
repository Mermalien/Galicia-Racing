const {
  selectUserByRegistrationCode,
  deleteRegistrationCode,
} = require("../../repositories/users");
const { generateError } = require("../../utils");

const activateUser = async (req, res, next) => {
  try {
    //Traemos el registrationCode de los params
    const { registrationCode } = req.params;

    //Vemos si hay algún usuario en la BBDD con ese registrationCode
    const user = await selectUserByRegistrationCode(registrationCode);

    //Si no hay ningún user con ese registrationCode lanzamos un error
    if (!user) {
      generateError("Código de registro inválido o usuario ya registrado", 400);
    }

    //Eliminamos el registrationCode para activar al user
    await deleteRegistrationCode(registrationCode);
    res
      .status(200)
      .send({ status: "ok", message: "Usuario activado exitosamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = activateUser;
