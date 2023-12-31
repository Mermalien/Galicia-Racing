const getDb = require("../../database/getDb");

const selectEventImages = async (eventId) => {
  const pool = getDb();

  const [eventImages] = await pool.query(
    "SELECT image FROM events WHERE id = ?",
    [eventId]
  );

  return eventImages;
};
module.exports = selectEventImages;
