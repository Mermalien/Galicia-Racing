const { selectUserById, deleteUserById } = require("../../repositories/users");
const { userIdSchema } = require("../../schemas/users");
const { validateSchema, generateError } = require("../../utils");

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await validateSchema(userIdSchema, id);
    const user = await selectUserById(id);
    if (!user) {
      generateError("El usuario no existe");
    }

    await deleteUserById(id);
    res.send({
      status: "Usuario eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteUser;
