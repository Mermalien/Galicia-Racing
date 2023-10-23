const insertEvent = require("./insertEvent");
const insertEventImage = require("./insertEventImage");
const selectEventById = require("./selectEventById");
const deleteEventById = require("./deleteEventById");
const selectEvents = require("./selectEvents");
const selectEventImages = require("./selectEventImages");
const selectEventByCity = require("./selectEventByCity");
const selectEventByTheme = require("./selectEventByTheme");

module.exports = {
  insertEvent,
  insertEventImage,
  selectEventImages,
  selectEventByTheme,
  selectEventById,
  deleteEventById,
  selectEventByCity,
  selectEvents,
};
