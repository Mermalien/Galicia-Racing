const { selectEventByTheme } = require("../../repositories/events");
const { filterEventsSchema } = require("../../schemas/events");
const { validateSchema } = require("../../utils");

const getEventByTheme = async (req, res, next) => {
  try {
    const theme = req.query.theme;
    const eventsByTheme = await selectEventByTheme(theme);

    await validateSchema(filterEventsSchema, req.query);
    res.send({
      status: "Estas son las publicaciones en la ciudad",
      data: eventsByTheme,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getEventByTheme;
