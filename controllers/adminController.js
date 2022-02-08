const Course = require("../models/course");
const Student = require('../models/student');
const Category = require('../models/category');
const coursePath = require("../models/coursePath");

const admin_index = (req, res) => {
  Course.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("index", { title: "Admin", course: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//GET /admin/add
//add course 
 const admin_add = (req, res) => {
  res.render("add", { title: "new" });
}; 


//POST /admin_add
//add course
 const admin_add_post = (req, res) => {
  const course = new Course(req.body);

  course
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
    Course.findByIdAndDelete(id)
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
const admin_index_student = (req, res) => {
  Student.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("userList", { title: "List", students: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const admin_add_coursePath = (req, res) => {
  res.render("addCoursePath", { title: "new" });
}; 
const admin_add_post_coursePath = (req, res) => {
  const path = new coursePath(req.body);

  path
    .save()
    .then((result) => {
      res.redirect("coursePathList");
    })
    .catch((err) => {
      console.log(err);
    });
}; 

const admin_index_coursePath = (req, res) => {
  coursePath.find()
    
    .then((result) => {
      res.render("coursePathList", { title: "List", coursePath: result });
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
  admin_add_coursePath,
  admin_add_post_coursePath,
  admin_index_coursePath,
  admin_add_student,
  admin_index_student
};
