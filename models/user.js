const { Schema, model } = require("mongoose");

/**
 {
     name:string
     email:string
     password:string
     avatar:string
     status:number
     google:boolean
     courses: course[]
 }
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Usuario requerido"],
  },
  email: {
    type: String,
    required: [true, "Correo requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password requerido"],
  },
  avatar: {
    type: String,
    default:
      "https://drive.google.com/file/d/1fLuHSu9uK8_W6sG-tOv5GWJlHLgQSP9B/view?usp=sharing",
  },
  
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  role:{
    type:String,
    default:'student'
  },
  courses:[
    {
      role:{
        type:String,
        required: [true, "Identificar tipo de usuario"]
      },
      courseName:{
        type:String,
        required: [true, "Identificar nombre del curso"]
      },
      courseDate:{
        type:String,
        required: [true, "Identificar fecha del curso"]
      }
    }
  ]
});

//metodos personalizados
userSchema.methods.toJSON = function () {
  const { __v, password,_id, ...user } = this.toObject();
  user.id = _id.toString()
  return user;
};

module.exports = model("User", userSchema);
