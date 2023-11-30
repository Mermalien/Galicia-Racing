const selectUserById = require("../../repositories/users/selectUserById");

const getMe = async (req, res, next) => {
  try {
    const user = await selectUserById(req.auth.id);

    res.send({
      status: "Mi info",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getMe;
