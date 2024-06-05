import { comparepassword, hashPassword } from "../helpers/authHelper.js"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import JWT  from "jsonwebtoken"

export const registerController=async(req,res)=>{
try{
const {name,email,password,Phone,address,answer}= req.body
if(!name){
    return res.send({message:'Name is Required'})
}
if(!email){
    return res.send({message:'Email is Required'})
}
if(!password){
    return res.send({message:'Password is Required'})
}
if(!Phone){
    return res.send({message:'Phone is Required'})
}
if(!address){
    return res.send({message:'Address is Required'})
}

//existing checking
const existuser=await userModel.findOne({email});
if(existuser){
    return res.status(200).send({
        success:false,
        message:'Already register please login'
    })
}
//registering user
const Hasedpassword=await hashPassword(password);
const user=await new userModel({
    name,email,Phone,address,password:Hasedpassword,answer
}).save();
res.status(201).send({
    success:true,
    message:"User added successfully",
    user,
})
}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in Registration",
        error
    })
}
}


//login


export const loginController= async(req,res)=>{
try{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(404).send({
            success:false,
            message:"Invalid email or password",
        })
    }
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email is not registered",
        })
    }
    const match=await comparepassword(password,user.password);
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid Password",
        })
    }
    const token=await  JWT.sign({_id:user.id},process.env.jwt_secretkey,{expiresIn:"1d"});
    res.status(200).send({
        success:true,
        message:"login successfully",
        user:{
            id:user._id,
            name:user.name,
            Phone:user.Phone,
            email:user.email,
            address:user.address,
            role:user.Role,
        },
        token,
    });
}catch(error){
res.status(500).send({
    success:false,
    message:"error in login",
    error
})
}
}


//Fortget-Password
export const forgetPasswordController= async(req,res)=>{
try {
   
    const{email,answer,newpassword}=req.body;
    if(!email){
        res.status(400).send({message:"email is required",})
    }
    if(!answer){
        res.status(400).send({message:"answer is required",})
    }
    if(!newpassword){
        res.status(400).send({message:"newpassword is required",})
    }
    
    const user=await userModel.findOne({email,answer});
    if(!user){
        return res.status(400).send({
            sucess:false,
            message:"Worng Email or answer"
        })
    }
   
    const hashed=await hashPassword(newpassword);
  
    await userModel.findByIdAndUpdate(user._id,{password: hashed})
   return res.status(200).send({
        success:true,
        message:"Password reset successfully",
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"somthing went wrong",
        error
    })
}
}

//test

export const testController=(req,res)=>{
    try{res.send("Protector Controller")}catch(error){
console.log(error);
res.send(error);
    }

}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, Phone } = req.body;
      
      const user = await userModel.findById(req.user._id);
      
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          Phone: Phone || user.Phone,
          address: address || user.address
        },
        { new: true }
      );
      
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });
    }
  };

  export const getOrderController=async(req,res)=>{
    try {
        const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in geting Orders",
        error,
      });
    }
  }

  //ALL orders
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt:'asc'});
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };