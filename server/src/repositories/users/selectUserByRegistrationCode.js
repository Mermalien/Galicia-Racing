const getDb = require("../../database/getDb");

const selectUserByRegistrationCode = async (registrationCode) => {
  const pool = getDb();

  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE registrationCode = ?",
    [registrationCode]
  );

  return user;
};

module.exports = selectUserByRegistrationCode;
