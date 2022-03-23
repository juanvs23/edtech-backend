const { check } = require("express-validator");
const { checkRoleId, checkRole,checkNoRole } = require("../helpers/check-role");



const RolesController = require("../controllers/rolesController"),
  { validateFields } = require("../middleware/validate-fields");
const rolesCotroller = new RolesController(); 
class Roles{
    constructor(router){
        this.router = router;
    }
    roles(){
        this.router.get('/api/roles/list',rolesCotroller.getListRoles)
        this.router.post('/api/roles/new',[
          
            check("roleName", "El role ya existe").custom(checkNoRole),
            validateFields,
        ],rolesCotroller.newRole)
        this.router.delete('/api/roles/delete/:id',[
            check("id", "No es un id valido").isMongoId(),
            check("id", "El id no existe").custom(checkRoleId),
            validateFields,
        ],rolesCotroller.deleteRole)
    }
   
}
module.exports = Roles