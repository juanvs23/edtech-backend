const Course = require('../models/course'),
      { addWeeks }= require('date-fns'),
      User = require('../models/user'),
      Role = require('../models/user'),
      compareDesc = require('date-fns/compareDesc'),
      
      responseSuccess = require("../helpers/response-sucess"),
      responseErrors = require("../helpers/response-errors");

class CourseController{
   async newCourse(req,res){
        const {name,description,teacher,startTime, endTime,duration,images}=req.body
        const start = new Date(startTime)
        const end = new Date(endTime)
        const durationTime = end.getTime() - start.getTime()
       console.log(start)
       // const course = Course({name,description,teacher,startTime, endTime,duration,images})  
      
      // await course.save()
        return responseSuccess(res,200,'course')
    }
    getListCourse(req,res){}
    updateCourse(req,res){}
    deleteCourse(req,res){}

}
module.exports = CourseController