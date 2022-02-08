const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
//app route

router.get('/',courseController.homepage);
router.get("/course", courseController.course_index);
router.get("/:id", courseController.course_content);

router.get('/:id',courseController.exploreCategories);
router.get('/categories/:id',courseController.exploreCategoriesById );
router.post('/search',courseController.searchCourse);
router.get('/explore-latest',courseController.exploreLatest);
router.get('/explore-random',courseController.exploreRandom);

const course = require("../models/course");

router.get("/", (req, res, next) => {
  course.find()
    .select("name  _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        courses: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:100/courses/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  course
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created course successfully",
        createdcourse: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:100/courses/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  course.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            course: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:100/courses'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  course.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'course updated',
          request: {
              type: 'GET',
              url: 'http://localhost:100/courses/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  course.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'course deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:100/courses',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;
