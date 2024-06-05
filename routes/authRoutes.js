import Express from "express";
import { registerController,loginController ,testController, forgetPasswordController, updateProfileController, getOrderController, getAllOrdersController, orderStatusController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddlewares.js";
//router obj
const router=Express.Router();

//register /method Post
router.post("/register",registerController);
//login //method post
router.post("/login",loginController);
//Forgot Password
router.post("/Forget-Password",forgetPasswordController)
//test
router.get("/test",requireSignIn,isAdmin,testController);
//Protected User route Auth
router.get("/user-auth",requireSignIn,(req,res)=>{
   return res.status(200).send({ok:true});
});
//Protected Admin route Auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
   return res.status(200).send({ok:true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrderController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router