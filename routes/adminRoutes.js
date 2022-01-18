const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.admin_index);

router.get("/add", adminController.admin_add);
router.get("/addStudent", adminController.admin_add_student);
router.post("/add", adminController.admin_add_post);
router.post("/addStudent", adminController.admin_add_post_student);
router.delete("/delete/:id", adminController.admin_delete);

module.exports = router;
