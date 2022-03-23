const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  roleName: {
    type: String,
    required: [true, "Identificar tipo de usuario"],
  },
});

//metodos personalizados
roleSchema.methods.toJSON = function () {
  const { __v, _id,...role } = this.toObject();
  role.id = _id.toString();
  return role;
};

module.exports = model("Role", roleSchema);
