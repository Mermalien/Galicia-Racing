const insertUserInDDBB = require("./insertUserInDDBB");
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");
const selectUserByRegistrationCode = require("./selectUserByRegistrationCode");
const createRegistrationCode = require("./createRegistrationCode");
const deleteRegistrationCode = require("./deleteRegistrationCode");
const insertUserAvatar = require("./insertUserAvatar");
const updateUserById = require("./updateUserById");
const updateUserAvatar = require("./updateUserAvatar");
const deleteUserById = require("./deleteUserById");

module.exports = {
  insertUserInDDBB,
  selectUserByEmail,
  selectUserById,
  selectUserByRegistrationCode,
  deleteUserById,
  createRegistrationCode,
  deleteRegistrationCode,
  insertUserAvatar,
  updateUserById,
  updateUserAvatar,
};
