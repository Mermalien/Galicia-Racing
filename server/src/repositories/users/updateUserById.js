const getDb = require("../../database/getDb");

const updateUserById = async (userId, newData) => {
  const pool = getDb();
  const [updated] = await pool.query("UPDATE users SET ? WHERE id = ?", [
    newData,
    userId,
  ]);
  return updated;
};
module.exports = updateUserById;
