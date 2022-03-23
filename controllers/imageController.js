const getImage = require("../helpers/getImage");
const   responseSuccess = require("../helpers/response-sucess"),
      
        responseErrors = require("../helpers/response-errors");

class ImageController{
   async setImage(req,res){
         let result = []
        if (!req.files || Object.keys(req.files).length === 0) {
            return responseErrors(res,400,'archivo no subido');
          }
      try {
          const image = await  getImage(req.files)
          return responseSuccess(res,200,image)
      } catch (error) {
        return responseErrors(res,400,`error: ${error}`)   
      }
       
       
    }
}


module.exports = ImageController