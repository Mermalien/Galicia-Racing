const getDb = require("../../database/getDb");

const deleteUserById = async (id) => {
  const pool = getDb();
  await pool.query("DELETE FROM attendees WHERE userId = ?", [id]);
  await pool.query("DELETE FROM events WHERE userId = ?", [id]);
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = deleteUserById;
