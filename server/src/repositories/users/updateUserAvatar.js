const getDb = require("../../database/getDb");

const updateUserAvatar = async (userId, newData) => {
  const pool = getDb();
  const [updatedAvatar] = await pool.query(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [newData, userId]
  );
  return updatedAvatar;
};
module.exports = updateUserAvatar;
