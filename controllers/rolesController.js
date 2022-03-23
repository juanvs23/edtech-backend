const  Role = require("../models/role");
const responseSuccess = require("../helpers/response-sucess");
const responseErrors = require("../helpers/response-errors");

class RolesController{
  

    async newRole(req,res){
        const { roleName  } =req.body;
        const role = new Role({ roleName });
        await role.save();
        return responseSuccess(res,200,role);
    }
    async getListRoles(req,res){
        const { role } = req.query
       
        if(role){
            const isRoleName = await Role.findOne({ role });
           if(isRoleName){
            return responseSuccess(res,200,isRoleName);
           }else{
            return responseErrors(res,404,['role'],[`El rol: ${roleName} no existe`]);   
           }
        }else{
            const roles = await Role.find({});
            if(roles.length>0){
                return responseSuccess(res,200,roles);
            }else{
                return responseErrors(res,404,['role'],[`No existen roles asignados`]);   
            }
        }
    }
    async deleteRole(req,res){
        const {id}= req.params
       
        const deleted = await Role.deleteOne({ _id: id });
        if(deleted.deletedCount>0){
            return responseSuccess(res,200,deleted);
        }else{
            return responseErrors(res,404,['role'],[`No existen roles asignados`]);   
        }
    }
}
module.exports = RolesController