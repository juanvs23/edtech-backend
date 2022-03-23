const RoleSchema = require("../models/role");
const User = require("../models/user");


const checkRole = async (roleName = "") => {
  const isRole = await RoleSchema.findOne({ roleName });
 
  if (!isRole) {
    throw new Error(`El rol: ${role}... no existe`);
  }
};

const checkNoRole = async (roleName = "") => {
  const isRole = await RoleSchema.findOne({ roleName });
  if (isRole) {
    console.log(isRole)
    throw new Error(`El rol: ${isRole.roleName}... ya existe`);
  }
};

const checkRoleId = async (id = "") => {
  const isId = await RoleSchema.findById(id);
 
  if (!isId) {

    throw new Error(`El id: ${id}... no existe`);
  }
};

module.exports = {
  checkRole,
  checkRoleId,
  checkNoRole
};
