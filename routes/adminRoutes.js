const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.admin_index);

router.get("/userList", adminController.admin_index_student);
router.get("/add", adminController.admin_add);
router.get("/addStudent", adminController.admin_add_student);
router.get("/addCoursePath", adminController.admin_add_coursePath);
router.get("/coursePathList", adminController.admin_index_coursePath);

router.post("/addCoursePath", adminController.admin_add_post_coursePath);
router.post("/add", adminController.admin_add_post);
router.post("/addStudent", adminController.admin_add_post_student);
router.delete("/delete/:id", adminController.admin_delete);

module.exports = router;
