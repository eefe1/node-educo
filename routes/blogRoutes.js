const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
//app route

router.get('/',blogController.homepage);
router.get("/", blogController.blog_index);
router.get("/:id", blogController.blog_content);

router.get('/:id',blogController.exploreCategories);
router.get('/categories/:id',blogController.exploreCategoriesById );
router.post('/search',blogController.searchCourse);
router.get('/explore-latest',blogController.exploreLatest);
router.get('/explore-random',blogController.exploreRandom);



module.exports = router;
