const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nombre requerido"],
      },
    description:{
        type:String,
        required:[true, "Descripción requerida"]
    },
    teacher:{
        type:String,
        required:[true, "Descripción requerida"]
    },
    status:{
        type:Boolean,
        default:true
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    duration:{
        type:Number,
        required:[true,'Duración requerida']
    },
    students:[
        {
            type:String,
            unique: true
        }
    ],
    
    images:{
        type:String
    }
    
})

courseSchema.methods.toJSON = function () {
    const { __v, _id, ...course } = this.toObject();
    return course;
  };
  
  module.exports = model("Course", courseSchema);
  