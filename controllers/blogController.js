const Blog = require("../models/blogs");
const Category = require("../models/category");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("blog", { title: "MainPage", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_content = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result, title: "Detay" });
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
    const latest = await Blog.find({}).sort({ _id: -1 }).limit(limitNumber);
    const JavaScript = await Blog.find({ category: "JavaScript" }).limit(
      limitNumber
    );
    const Express = await Blog.find({ category: "Express" }).limit(limitNumber);
    const Node = await Blog.find({ category: "Node" }).limit(limitNumber);
    const MongoDB = await Blog.find({ category: "MongoDB" }).limit(limitNumber);
    const React = await Blog.find({ category: "React" }).limit(limitNumber);
    const courseIndex = { latest, JavaScript, Express, Node, MongoDB, React };

    res.render("admin", { title: "Educo", categories, courseIndex });
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
    const categoryById = await Blog.find({ category: categoryId }).limit(
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
    let course = await Blog.find({
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
    const course = await Blog.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Educo - Explore Latest', course } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 
//GET /explore-random
//explore random as Json
const exploreRandom = async(req, res) => {
  try {
    let count = await Blog.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let course = await Blog.findOne().skip(random).exec();
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
  blog_index,
  blog_content,
  homepage,
  exploreCategories,
  exploreCategoriesById,
  searchCourse,
  exploreLatest,
  exploreRandom,
};
