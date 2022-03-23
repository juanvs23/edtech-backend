const  ImageController  = require('../controllers/imageController')

const imageController = new ImageController()
class ImageRouter{
    constructor(router){
        this.router = router
    }
   imageRouter(){
    this.router.post('/api/images/new', imageController.setImage)
   }
}



module.exports = ImageRouter