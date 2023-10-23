const getDb = require("../../database/getDb");

const insertUserInDDBB = async (user) => {
  const {
    name,
    email,
    encryptedPassword,
    biografia,
    avatar,
    registrationCode,
  } = user;

  const pool = getDb();

  const [{ insertId }] = await pool.query(
    "INSERT INTO users (name, email, password, biografia, avatar, registrationCode) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, encryptedPassword, biografia, avatar, registrationCode]
  );

  return insertId;
};

module.exports = insertUserInDDBB;
