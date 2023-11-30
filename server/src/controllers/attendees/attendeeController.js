const {
  selectAttendeeById,
  createAttendee,
  deleteAttendee,
} = require("../../repositories/attendees");
const { selectEventById } = require("../../repositories/events");

const { generateError } = require("../../utils");

const attendeeController = async (req, res, next) => {
  try {
    //Nos traemos el id del evento al que se quiere asistir y lo validamos
    const { eventId } = req.params;

    //Seleccionamos el evento correspondiente
    const evento = await selectEventById(eventId);

    if (!evento) {
      generateError(
        "La publicación en la que te quieres inscribir no existe",
        404
      );
    }

    //Traemos el id del usuario que quiere inscribirse y vemos si ya está inscrito en el evento
    const loggedUserId = req.auth.id;
    const attendee = await selectAttendeeById(loggedUserId, eventId);

    //Inscrito/no inscrito
    let inscription;
    let statusCode;

    //Si ya está inscrito y se quiere quitar
    if (attendee) {
      deleteAttendee(loggedUserId, eventId);
      inscription = false;
      statusCode = 200;
    } else {
      createAttendee(loggedUserId, eventId);
      inscription = true;
      statusCode = 201;
    }

    res.status(statusCode).send({
      status: "ok",
      data: { inscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = attendeeController;
