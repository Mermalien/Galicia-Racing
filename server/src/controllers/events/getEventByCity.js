const selectEventByCity = require("../../repositories/events/selectEventByCity");
const { validateSchema, generateError } = require("../../utils");
const { filterEventsSchema } = require("../../schemas/events");

const getEventByCity = async (req, res, next) => {
  try {
    // Traemos la ciudad que se buscó
    const city = req.query;

    await validateSchema(filterEventsSchema, city);
    // Buscamos entre todos los eventos de la bbdd los que coinciden
    const eventsByCity = await selectEventByCity(city);

    if (!eventsByCity) {
      generateError("No se han encontrado resultados");
    }

    res.send({
      status: "Estas son las publicaciones en la ciudad",
      data: eventsByCity,
    });
    console.log(`Publicaciones de la ciudad: ${eventsByCity}`);
  } catch (error) {
    next(error);
  }
};

module.exports = getEventByCity;
