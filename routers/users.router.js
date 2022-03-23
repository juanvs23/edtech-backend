const { check } = require("express-validator");
const {  checkRole } = require("../helpers/check-role");
const { checkUserId } = require('../helpers/check-user')

const UsersController = require("../controllers/usersController"),
  { validateFields, checkUser } = require("../middleware/validate-fields");
const usersController = new UsersController();
class Users {
  constructor(router) {
    this.router = router;
  }
  userList() {
    const passrwordLength = 6;
    this.router.get(
      "/api/users/list",

      usersController.getListUser
    );
    this.router.post(
      "/api/users/new",
      [
        check("email", "Formato de correo invalido").isEmail(),
        checkUser,
        check("name", "El nombre no puede estar vacio").not().isEmpty(),
        check(
          "password",
          `La constraseña debe tener al menos ${passrwordLength} caracteres`
        ).isLength({ min: passrwordLength }),
     
        validateFields,
      ],
      usersController.newUser
    );
    this.router.put(
      "/api/users/update/:id",
      [
        check("id", "No es un id valido").isMongoId(),
        check("id", "El id no existe").custom(checkUserId),
        validateFields,
      ],
      usersController.updateUser
    );
    this.router.delete(
      "/api/users/delete/:id",
      [
        check("id", "No es un id valido").isMongoId(),
        check("id", "El id no existe").custom(checkUserId),
        check(
          "validate",
          `La constraseña debe tener al menos ${passrwordLength} caracteres`
        ).isLength({ min: passrwordLength }),
        validateFields,
      ],
      usersController.deleteUser
    );
  }
}
module.exports = Users;
