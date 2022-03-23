const { validationResult } = require("express-validator");
const User = require("../models/user");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      data: errors,
    });
  }
  next();
};

const checkUser = async (req, res, next) => {
  const { email } = req.body;

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({
      status: 400,
      data: {
        error: "email",
        msg: `El correo ${email} ya existe`,
      },
    });
  }
  next();
};

module.exports = {
  validateFields,
  checkUser,
};
