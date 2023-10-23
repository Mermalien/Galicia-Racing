const getDb = require("../../database/getDb");

const createAttendee = async (userId, eventId) => {
  const pool = getDb();

  const [{ insertId }] = await pool.query(
    "INSERT INTO attendees (userId, eventId) VALUES (?, ?)",
    [userId, eventId]
  );

  return insertId;
};

module.exports = createAttendee;
