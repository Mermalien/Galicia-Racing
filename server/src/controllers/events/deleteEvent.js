const {
  selectEventById,
  deleteEventById,
} = require("../../repositories/events");
const { eventIdSchema } = require("../../schemas/events");
const { generateError } = require("../../utils");

const deleteEvent = async (req, res, next) => {
  try {
    //Traemos el id del post que se quiere eliminar y lo validamos
    const { eventId } = req.params;
    await eventIdSchema.validateAsync(eventId);

    //Ahora lo seleccionamos en la BBDD, si no existe lanzamos un error
    const event = await selectEventById(eventId);

    if (!event) {
      generateError("El evento no existe", 404);
    }

    //Traemos el id del usuario que quiere eliminar el evento y verificamos que sea el dueño
    const loggedUserId = req.auth.id;

    if (event.userId !== loggedUserId) {
      generateError("No puedes eliminar una publicación que no es tuya", 401);
    }

    //LLamamos a la BBDD para que elimine ese evento
    await deleteEventById(eventId);

    res
      .status(200)
      .send({ status: "ok", message: "Publicación eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteEvent;
