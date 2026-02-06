const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../../controllers/categories/categoriesController");
const isLoggedIn = require("../../middlewares/isLoggedin");

const categoriesRouter = express.Router();
//Create Category router
categoriesRouter.post("/", isLoggedIn, createCategory);
//fetch all category
categoriesRouter.get("/", getAllCategories);
//delete a category
categoriesRouter.delete("/:id", isLoggedIn, deleteCategory);
//update  a category
categoriesRouter.put("/:id", isLoggedIn, updateCategory);

module.exports = { categoriesRouter };
