const getDb = require("../../database/getDb");

const deleteUserById = async (id) => {
  const pool = getDb();

  await pool.query("SELECT * FROM users WHERE id = ?", [id]);
};

module.exports = deleteUserById;
