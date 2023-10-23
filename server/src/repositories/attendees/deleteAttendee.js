const getDb = require("../../database/getDb");

const deleteAttendee = async (userId, eventId) => {
  const pool = getDb();

  await pool.query("DELETE FROM attendees WHERE userId = ? AND eventId = ?", [
    userId,
    eventId,
  ]);
};

module.exports = deleteAttendee;
