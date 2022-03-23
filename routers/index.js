const express = require("express"),
  router = express.Router(),
  Users = require("./users.router"),
  Course = require('./courses.router'),
  ImageRouter  = require('./image.router'),
  Roles = require('./roles.router');

const users = new Users(router);
const roles = new Roles(router);
const course = new Course(router);
const image = new ImageRouter(router); 
const routers = () => {
  users.userList();
  roles.roles();
  course.courses();
  image.imageRouter();
  return router;
};


module.exports = {
  routers
};
