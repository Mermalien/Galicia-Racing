const {
  selectEventById,
  selectEventImages,
} = require("../../repositories/events");
const { eventIdSchema } = require("../../schemas/events");
const { generateError } = require("../../utils");

const getSingleEvent = async (req, res, next) => {
  try {
    //Traemos el id que nos envían y lo validamos
    const { id } = req.params;

    await eventIdSchema.validateAsync(id);

    // Seleccionamos el evento con ese id, si no existe lanzamos un error
    const evento = await selectEventById(id);

    if (!evento) {
      generateError("La publicación no existe", 404);
    }

    //Cogemos las imágenes del evento y creamos una propiedad "images" para guardar el array de imágenes de la bbdd
    const eventImages = await selectEventImages(id);
    evento.images = eventImages;

    res.status(200).send({ status: "ok", data: evento });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleEvent;
