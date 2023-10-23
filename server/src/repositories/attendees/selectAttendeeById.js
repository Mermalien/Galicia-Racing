const getDb = require("../../database/getDb");

const selectAttendeeById = async (eventId, userId) => {
  const pool = getDb();

  const [[attendee]] = await pool.query(
    "SELECT * FROM attendees WHERE eventId = ? AND userId = ?",
    [eventId, userId]
  );

  return attendee;
};

module.exports = selectAttendeeById;
