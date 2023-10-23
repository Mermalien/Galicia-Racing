const getPool = require("../../database/getDb");

const deleteEventById = async (id) => {
  const pool = getPool();

  await pool.query("DELETE FROM attendees WHERE eventId = ?", [id]);

  await pool.query("DELETE FROM events WHERE id = ?", [id]);
};
module.exports = deleteEventById;
