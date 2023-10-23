const createEventSchema = require("../../schemas/events/createEventSchema");
const { insertEvent, insertEventImage } = require("../../repositories/events");
const { processAndSaveImage, generateError } = require("../../utils");

const createEvent = async (req, res, next) => {
  try {
    //Traemos el id del usuario
    const userId = req.auth.id;

    //Validamos el body de la petición y nos traemos los datos
    await createEventSchema.validateAsync(req.body);
    const { title, description, theme, city, date } = req.body;

    const image = req.files?.image;

    if (!image) {
      generateError("Image is required", 400);
    }

    const imageName = await processAndSaveImage(image.data);

    //Insertamos el evento publicado en la BBDD
    const insertedEventId = await insertEvent({
      userId,
      title,
      description,
      image: imageName,
      theme,
      city,
      date,
    });

    res.status(201).send({
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
