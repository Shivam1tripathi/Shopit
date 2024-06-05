import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddlewares.js";
import { createCategoryController, deleteCategory, getAllCategory, singleCategory, updateCategoryController } from "../controllers/categoryController.js";

const router=express.Router()

//Create Category
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)

//Update Category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

//Get All Category
router.get("/allcategory",getAllCategory);

//Get Single Category
router.get("/singlecategory/:slug",singleCategory);

//delete Category
router.delete("/deletecategory/:id",requireSignIn,isAdmin,deleteCategory)
export default router;