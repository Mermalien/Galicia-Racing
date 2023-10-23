const getPool = require("../../database/getDb");

const insertEventImage = async (imageName, eventId) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO events (image, eventId) VALUES (?, ?)",
    [imageName, eventId]
  );
  return insertId;
};

module.exports = insertEventImage;
