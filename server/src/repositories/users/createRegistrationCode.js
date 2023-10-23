const getPool = require("../../database/getDb");

const createRegistrationCode = async (registrationCode) => {
  const pool = getPool();
  await pool.query(
    "UPDATE users SET registrationCode = NULL WHERE registrationCode = ?",
    [registrationCode]
  );
};

module.exports = createRegistrationCode;
