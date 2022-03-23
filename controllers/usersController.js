const User = require("../models/user"),
  RoleSchema = require("../models/role"),
  responseSuccess = require("../helpers/response-sucess"),
  responseErrors = require("../helpers/response-errors"),
  bcryptjs = require("bcryptjs");

class UsersController {
  _constructor() {
    this.password;
    this.user;
  }
  /**
   *  Create user
   * @param {*} req
   * @param {*} res
   * @returns object
   */
  async newUser(req, res) {
    const { name, email, password, avatar, role } = req.body;
    let user = new User({ name, email, password, avatar, role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    return responseSuccess(res, 200, user);
  }
  /**
   * read user
   * @param {*} req
   * @param {*} res
   * @returns object
   */
  async getListUser(req, res) {
    const { limit = 5, offset = 0, role = null, email = null } = req.query;
    let queryParams = new Object();
    queryParams.status = true;
    if (role) {
      const isRole = await RoleSchema.findOne({ role });
      if (isRole) {
        queryParams.role = role;
      } else {
        return responseErrors(
          res,
          400,
          ["role"],
          [`El role ${role} no existe`]
        );
      }
    }
    if (email) {
      const isEmailExist = await User.findOne({ email, status: true });
      if (isEmailExist) {
        queryParams.email = email;
      } else {
        return responseErrors(
          res,
          400,
          ["email"],
          [`El email ${email} no existe`]
        );
      }
    }

    if (isNaN(limit) || isNaN(offset)) {
      let error = [];
      let msg = [];
      if (isNaN(limit)) {
        error.push("limit");
        msg.push(`El limite "${limit}" No es un numero`);
      }
      if (isNaN(offset)) {
        error.push("offset");
        msg.push(`El offset "${offset}" No es un numero`);
      }
      return responseErrors(res, 400, error, msg);
    }

    const [users, total] = await Promise.all([
      await User.find(queryParams)
        .skip(parseInt(offset))
        .limit(parseInt(limit)),
      await User.countDocuments(queryParams),
    ]);
    const data = {
      total,
      users,
    };
    return responseSuccess(res, 200, data);
  }
  /**
   * update user
   * @param {*} req
   * @param {*} res
   * @returns object
   */

  async updateUser(req, res) {
    const { id } = req.params;
    const { _id, password, google, email, ...user } = req.body;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);
    }
    const userUpdated = await User.findByIdAndUpdate(id, user,{new: true});
    return responseSuccess(res, 200, userUpdated);
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @return object
   */
  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    const { validate } = req.body;
    const checkPassword = await bcryptjs.compareSync(validate, user.password);
    if (!checkPassword) {
      return responseErrors(
        res,
        400,
        ["validate"],
        ["El password no es correcto"]
      );
    }
    await User.findByIdAndUpdate(id, { status: false });

    let data = {
      delete: "ok",
    };
    return responseSuccess(res, 200, data);
  }
}
module.exports = UsersController;
