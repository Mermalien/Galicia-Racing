const getDb = require("../../database/getDb");

const insertUserInDDBB = async (user) => {
  const {
    name,
    email,
    encryptedPassword,
    biografia,
    avatarName,
    registrationCode,
  } = user;

  const pool = getDb();

  const [{ insertId }] = await pool.query(
    "INSERT INTO users (name, email, password, biografia, avatar, registrationCode) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, encryptedPassword, biografia, avatarName, registrationCode]
  );

  return insertId;
};

module.exports = insertUserInDDBB;
