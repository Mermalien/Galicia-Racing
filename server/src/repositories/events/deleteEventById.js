const getPool = require("../../database/getDb");

const deleteEventById = async (eventId) => {
  const pool = getPool();

  await pool.query("DELETE FROM attendees WHERE eventId = ?", [eventId]);

  await pool.query("DELETE FROM events WHERE id = ?", [eventId]);
};
module.exports = deleteEventById;
