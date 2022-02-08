const Course = require("../models/course");
const Category = require("../models/category");

 const course_index = (req, res) => {
  Course.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("course", { title: "MainPage", course: result });
    })
    .catch((err) => {
      console.log(err);
    });
}; 

const course_content = (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .then((result) => {
      res.render("courseDetail", { course: result, title: "Detail" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Page Not Found" });
    });
};
//GET
//HOMEPAGE

const homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Course.find({}).sort({ _id: -1 }).limit(limitNumber);
    const JavaScript = await Course.find({ category: "JavaScript" }).limit(
      limitNumber
    );
    const Express = await Course.find({ category: "Express" }).limit(limitNumber);
    const Node = await Course.find({ category: "Node" }).limit(limitNumber);
    const MongoDB = await Course.find({ category: "MongoDB" }).limit(limitNumber);
    const React = await Course.find({ category: "React" }).limit(limitNumber);
    const courseIndex = { latest, JavaScript, Express, Node, MongoDB, React };

    res.render("index", { title: "Educo", categories, courseIndex });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};
//GET
//CATEGORIES
const exploreCategories = async (req, res) => {
  try {
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "Courses- Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error" });
  }
};
//GET /categories/:id
//CATEGORIES BY ID
const exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 10;
    const categoryById = await course.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", { title: "Courses - Categoreis", categoryById });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error" });
  }
};
//POST /search
//SEARCH
const searchCourse = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let course = await Course.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Search", course });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error" });
  }
};
//GET /explore-latest
//EXPLORE LATEST
const exploreLatest = async(req, res) => {
  try {
    const limitNumber = 10;
    const course = await Course.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Educo - Explore Latest', course } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 
//GET /explore-random
//explore random as Json
const exploreRandom = async(req, res) => {
  try {
    let count = await Course.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let course = await Course.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Educo - Explore Latest', course } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 




//Category
/**
 * Dummy Data Example
 */

/* async function insertDymmyCategoryData() {
  try {
    await Category.insertMany([
      {
        name: "JavaScript",
        image: "JavaScript.jpg",
      },
      {
        name: "HTML",
        image: "HTML.jpg",
      },
      {
        name: "React",
        image: "React.jpg",
      },
      {
        name: "Node",
        image: "Node.jpg",
      },
      {
        name: "MongoDB",
        image: "MongoDB.jpg",
      },
    ]);
  } catch (error) {
    console.log("err", +error);
  }
}
 */
// insertDymmyCategoryData();

module.exports = {
  course_index,
  course_content,
  homepage,
  exploreCategories,
  exploreCategoriesById,
  searchCourse,
  exploreLatest,
  exploreRandom,
};
