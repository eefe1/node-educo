const Blog = require("../models/blogs");
const Student = require('../models/student');
const Category = require('../models/category');

const admin_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
//GET /admin/add
//add course 
 const admin_add = (req, res) => {
  res.render("add", { title: "yeni yazi" });
}; 


//POST /admin_add
//add course
 const admin_add_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
}; 






//DELETE
const admin_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ link: "/admin" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
//GET /admin/add/student
//add student 
const admin_add_student = (req, res) => {
  res.render("addStudent", { title: "yeni yazi" });
}; 
//POST /admin_add
//add course
const admin_add_post_student = (req, res) => {
  const student = new Student(req.body);

  student
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
}; 
module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
  admin_add_post_student,
  admin_add_student
};
