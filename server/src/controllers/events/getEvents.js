const selectEvents = require("../../repositories/events/selectEvents");
const { filterEventsSchema } = require("../../schemas/events");

const getEvents = async (req, res, next) => {
  try {
    await filterEventsSchema.validateAsync(req.query);

    const events = await selectEvents(req.query);

    res.status(200).send({
      status: "Estas son las publicaciones de nuestros usuarios",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getEvents;
