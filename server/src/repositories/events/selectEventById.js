const getPool = require("../../database/getDb");

const selectEventById = async (eventId) => {
  const pool = getPool();

  //Seleccionamos la info del evento incluidos los asistentes
  const [[evento]] = await pool.query(
    `
      SELECT 
        e.*, 
        GROUP_CONCAT(users.name) AS attendees 
      FROM events e
      LEFT JOIN attendees a ON e.id = a.eventId 
      LEFT JOIN users ON a.userId = users.id
      WHERE e.id = ? 
      GROUP BY e.id
    `,
    [eventId]
  );

  return evento;
};

module.exports = selectEventById;
