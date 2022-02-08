const Course = require("../models/course");
const Category = require("../models/category");
const coursePath = require("../models/coursePath");

const coursePath_index = (req, res) => {
    coursePath
    .find()
    .select(" quantity _id")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        coursePath: docs.map((doc) => {
          return {
            _id: doc._id,
            course: doc.Course,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:100/coursePath/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  }; 
  const path_post = (req, res) => {
    const path = new coursePath(req.body.courseId);
    path
      .save()
      .then((result) => {
        res.redirect("/coursePathList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  module.exports = {
    coursePath_index,
    path_post

  };