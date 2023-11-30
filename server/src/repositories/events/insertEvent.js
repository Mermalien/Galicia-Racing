const getPool = require("../../database/getDb");

const insertEvent = async (evento) => {
  const { userId, title, description, imageName, theme, city, date } = evento;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO events (userId, title, description, image, theme, city, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, title, description, imageName, theme, city, date]
  );

  return insertId;
};

module.exports = insertEvent;
