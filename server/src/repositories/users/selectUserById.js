const getDb = require("../../database/getDb");

const selectUserById = async (id) => {
  const pool = getDb();

  const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  return user;
};

module.exports = selectUserById;
