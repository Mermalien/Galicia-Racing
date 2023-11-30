const getPool = require("../../database/getDb");

const selectEventByCity = async ({ city }) => {
  const pool = getPool();

  const [[eventByCity]] = await pool.query(
    `SELECT * FROM events WHERE city = ?`,
    [city]
  );
  return [eventByCity];
};

module.exports = selectEventByCity;
