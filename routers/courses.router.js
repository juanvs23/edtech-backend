const { check } = require("express-validator");
const { checkRoleId, checkRole,checkNoRole } = require("../helpers/check-role");
const { checkUserId } = require('../helpers/check-user'),
      { validateFields, checkUser } = require("../middleware/validate-fields"),
      CourseController=require('../controllers/courseController')

const course = new CourseController()
class Course{
    constructor(router) {
        this.router = router;
      }

   
    async courses(){
        this.router.get('/api/courses/list',course.getListCourse)
        this.router.post('/api/courses/new-course',course.newCourse)
        this.router.put('/api/courses/update-course/:id',course.updateCourse)
        this.router.put('/api/courses/delete-course/:id',course.deleteCourse)
    }
   
}
module.exports = Course