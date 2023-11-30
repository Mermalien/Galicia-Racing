const getPool = require("../../database/getDb");

const insertUserAvatar = async (imageName, userId) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO users (avatar, userId) VALUES (?, ?)",
    [imageName, userId]
  );
  return insertId;
};

module.exports = insertUserAvatar;
