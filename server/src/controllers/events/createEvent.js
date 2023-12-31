const createEventSchema = require("../../schemas/events/createEventSchema");
const { insertEvent } = require("../../repositories/events");
const { saveImg, generateError, validateSchema } = require("../../utils");

const createEvent = async (req, res, next) => {
  try {
    //Traemos el id del usuario
    const userId = req.auth.id;

    //Validamos el body de la petición y nos traemos los datos
    const { title, description, theme, city, date } = req.body;

    await validateSchema(createEventSchema, req.body);

    const image = req.files?.image;

    if (!image) {
      generateError("Image is required", 400);
    }

    const imageName = await saveImg(image.data, 800);

    //Insertamos el evento publicado en la BBDD
    const insertedEventId = await insertEvent({
      userId,
      title,
      description,
      imageName,
      theme,
      city,
      date,
    });

    res.send({
      status: "Evento creado",
      data: {
        id: insertedEventId,
        userId,
        title,
        description,
        image: imageName,
        theme,
        city,
        date,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = createEvent;
