const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/course");
const coursePath = require("../models/coursePath");
const coursePathController = require("../controllers/coursePathController");




// handle incoming GET request to courses
router.get("/coursePathList", coursePathController.coursePath_index);
router.post("/courseDetail", coursePathController.path_post);


router.post("/coursePath", (re, res, next) => {
  const coursePath = new coursePath({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    course: req.course.CourseId,
  });
  Course
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  Course.findById(req.body.CourseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          message: "course not found",
        });
      }
      const coursePath = new coursePath({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        blog: req.body.BlogId,
      });
      return coursePath.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "CoursePath has created",
        createdCoursePath: {
          _id: result._id,
          course: result.course,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:100/coursePath/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:coursePathId", (req, res, next) => {
  coursePath
    .findById(req.params.coursePathId)
    .exec()
    .then((coursePath) => {
      if (!coursePath) {
        return res.status(404).json({
          message: "Path has not found",
        });
      }
      res.status(200).json({
        coursePath: coursePath,
        request: {
          type: "GET",
          url: "http://localhost:100/coursePath/:coursePathId",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

/* router.get("/:coursePathId", (req, res, next) => {
  const coursePathExample = new coursePath({
    _id: "",
    course: "course1",
    quantity: 3,
  });
  coursePathExample.save()
  .then((result) => {
    res.send(result);
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}); */

router.delete("/:coursePathId", (req, res, next) => {
  coursePath
    .remove({ _id: req.params.coursePathId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "coursePath deleted",
        request: {
          type: "POST",
          url: "http://localhost:100/coursePath",
          body: { BlogId: "ID", quantity: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
