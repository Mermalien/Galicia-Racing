const getPool = require("../../database/getDb");

const selectEventByTheme = async (theme) => {
  const pool = getPool();

  await pool.query(`SELECT * FROM events WHERE theme = ?`, [theme]);
  return theme;
};

module.exports = selectEventByTheme;
