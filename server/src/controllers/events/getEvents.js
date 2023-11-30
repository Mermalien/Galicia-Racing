const selectEvents = require("../../repositories/events/selectEvents");
const { filterEventsSchema } = require("../../schemas/events");

const getEvents = async (req, res, next) => {
  try {
    const events = await selectEvents(req.query);

    res.send({
      status: "Estas son las publicaciones de nuestros usuarios",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getEvents;
