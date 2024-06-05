import  Express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddlewares.js";
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getProductController, getProductPhotoController, getSingleProductController, productCategoryController, productCountController, productListController, searchProductController, similarProductController, updateProductController } from "../controllers/productController.js";
import formidableMiddleware from 'express-formidable';
const router=Express.Router();

//Create Product
router.post("/create-product",requireSignIn,isAdmin,formidableMiddleware(),createProductController)

//update Product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidableMiddleware(),updateProductController)

//Get All Product 
router.get("/get-product",getProductController)

//Get single Product 
router.get("/get-product/:slug",getSingleProductController)

//Get Photo 
router.get("/get-product-photo/:pid",getProductPhotoController)

//delete product
router.delete("/delete-product/:pid",deleteProductController)

//Filter product
router.post("/product-filters",filterProductController)

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar Products
router.get("/similar-product/:pid/:cid",similarProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;