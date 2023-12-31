const insertUserInDDBB = require("./insertUserInDDBB");
const selectUserByEmail = require("./selectUserByEmail");
const selectUserById = require("./selectUserById");
const selectUserByRegistrationCode = require("./selectUserByRegistrationCode");
const deleteUserById = require("./deleteUserById");
const createRegistrationCode = require("./createRegistrationCode");
const deleteRegistrationCode = require("./deleteRegistrationCode");
const insertUserAvatar = require("./insertUserAvatar");

module.exports = {
  insertUserInDDBB,
  selectUserByEmail,
  selectUserById,
  selectUserByRegistrationCode,
  deleteUserById,
  createRegistrationCode,
  deleteRegistrationCode,
  insertUserAvatar,
};
