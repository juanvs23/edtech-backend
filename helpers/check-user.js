const User = require("../models/user");


;
const checkUserId = async (id = "") => {
  const isId = await User.findById(id);
  if (!isId) {
    throw new Error(`El id: ${id}... no existe`);
  }
}

module.exports = {
    checkUserId
}