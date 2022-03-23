const { v4: uuidv4 } = require('uuid');
const path = require('path');

const getImage=(files, extensions = ['jpg','png','jpeg','webp','gif'],folder='')=>{
    return new Promise((resolve,reject)=>{
        const { image } = files
        const getExtension= image.name.split('.')[image.name.split('.').length-1]
        if(!extensions.includes(getExtension)) reject('Format invalid')
        const newName=  `${uuidv4()}.${getExtension}`
        const uploadPath = path.join(__dirname,'../public/images',folder,newName)
        image.mv(uploadPath,(err)=>{
                 if(err)reject(error);
                 resolve(`${newName}`)
         })
       
    })  
}


module.exports = getImage