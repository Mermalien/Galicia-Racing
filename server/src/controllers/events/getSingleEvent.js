const {
  selectEventById,
  selectEventImages,
} = require("../../repositories/events");
const { eventIdSchema } = require("../../schemas/events");
const { generateError, validateSchema } = require("../../utils");

const getSingleEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    let str = eventId;
    let parsedId = parseInt(str, 10);

    // Validamos el id del evento que se busca
    await validateSchema(eventIdSchema, parsedId);

    // Seleccionamos el evento con ese id, si no existe lanzamos un error
    const evento = await selectEventById(parsedId);
    if (!evento) {
      generateError("La publicación que buscas no existe", 404);
    }

    // Cogemos las imágenes del evento y creamos una propiedad "images" para guardar el array de imágenes de la bbdd
    const eventImages = await selectEventImages(eventId);
    evento.images = eventImages;

    res.send({
      status: "ok",
      data: evento,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleEvent;
