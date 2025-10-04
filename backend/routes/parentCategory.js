const express = require("express");
const router = express.Router();
const parentCategoryController = require("../controllers/parentCategoryController");

router.get("/", parentCategoryController.listParentCategories);
router.get("/:id", parentCategoryController.getParentCategory);
router.post("/", parentCategoryController.createParentCategory);
router.put("/:id", parentCategoryController.updateParentCategory);
router.delete("/:id", parentCategoryController.deleteParentCategory);

module.exports = router;
