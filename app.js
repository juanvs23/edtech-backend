require("dotenv").config();
const express = require("express"),
   fileUpload = require('express-fileupload'),
  { routers } = require("./routers/index"),
 
  path = require("path"),
  cors = require("cors"),

  port = process.env.PORT;
  //router = require('./routers/index')
  const { connectionDB } = require("./database/db.config");
  connectionDB();

 const app = express();
app.use(express.static("public"));      
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  createParentPath:true,
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use("/", routers());

app.listen(port,()=>{
    console.log(`running at ${port} port`);
});

  