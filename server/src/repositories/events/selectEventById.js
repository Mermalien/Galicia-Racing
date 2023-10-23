const getPool = require("../../database/getDb");

const selectEventById = async (eventId) => {
  const pool = getPool();

  //Seleccionamos la info del evento incluidos los asistentes
  const [[evento]] = await pool.query(
    "SELECT events.*, COUNT(attendees.id) AS attendees FROM events LEFT JOIN attendees ON events.id = attendees.eventId WHERE events.id = ? GROUP BY events.id",
    [eventId]
  );
  return evento;
};

module.exports = selectEventById;
