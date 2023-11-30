const {
  selectEventById,
  deleteEventById,
} = require("../../repositories/events");
const { generateError, validateSchema } = require("../../utils");
const { eventIdSchema } = require("../../schemas/events");

const deleteEvent = async (req, res, next) => {
  try {
    // Traemos el id del post que se quiere eliminar, lo convertimos a número y lo validamos
    const { eventId } = req.params;
    let str = eventId;
    let parsedNum = parseInt(str, 10);

    await validateSchema(eventIdSchema, eventId);

    // Ahora lo seleccionamos en la BBDD, si no existe lanzamos un error
    const evento = await selectEventById(eventId);

    if (!evento) {
      generateError("El evento no existe", 404);
    }

    // Traemos el id del usuario que quiere eliminar el evento y verificamos que sea el dueño
    const loggedUserId = req.auth.id;

    if (evento.userId !== loggedUserId) {
      generateError("No puedes eliminar una publicación que no es tuya", 401);
    }

    //LLamamos a la BBDD para que elimine ese evento
    await deleteEventById(eventId);
    res.send({ status: "ok", message: "Publicación eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteEvent;
