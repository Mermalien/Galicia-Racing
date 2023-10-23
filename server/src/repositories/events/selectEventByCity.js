const getPool = require("../../database/getDb");

const selectEventByCity = async (city) => {
  const pool = getPool();

  await pool.query(`SELECT * FROM events WHERE city = ?`, [city]);
  return city;
};

module.exports = selectEventByCity;
