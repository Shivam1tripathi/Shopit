import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from "fs"
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

//payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.Braintree_Merchant_ID,
  publicKey: process.env.Breaintree_Public_Key,
  privateKey: process.env.Breaintree_Private_Key,
});

//Create product 
export const createProductController=async(req,res)=>{
try {
    const {name,slug,description,price,category,quantity,shipping}=req.fields;
    const {photo}=req.files;
    switch (true) {
        case !name:
            return res.status(500).send({message:"Name is required"});
        case !description:
            return res.status(500).send({message:"description is required"});
        case !price:
            return res.status(500).send({message:"price is required"});
        case !category:
            return res.status(500).send({message:"category is required"});
        case !quantity:
            return res.status(500).send({message:"quantity is required"});
        case photo && photo.size>1000000:
            return res.status(500).send({message:"Photo is required and size must be less then 1mb"});
    }
    const products=new productModel({...req.fields,slug:slugify(name)});
    if(photo){
        products.photo.data =fs.readFileSync(photo.path);
        products.photo.contentType=photo.type
    }
    await products.save()
    res.status(201).send({
        success:true,
        message:"Product Created successfull",
        products
    })
} catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"error in Creating product",
        error
    })
}
}

//get ALL Product 

export const getProductController=async(req,res)=>{
try {
    const allproducts=await productModel.find({}).populate('category').select("-photo").limit(15).sort({created:-1})
    res.status(200).send({
        success:true,
        totalcount:allproducts.length,
        message:"All Products",
        product:allproducts,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in getting products",
        error:error.message
    })
}
}


//get single product

export const getSingleProductController=async(req,res)=>{
    try {
        const singleproduct=await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            message:"Products with this id is",
            products:singleproduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting products with this id",
            error
        })
    }
}


// get product photo
export const getProductPhotoController=async(req,res)=>{
    try{      
const product =await productModel.findById(req.params.pid).select("photo")

if(product.photo.data){
    res.set("content-type", product.photo.contentType)
    
    return res.status(200).send(product.photo.data)
}
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting Products Photo",
            error
        })
    }
}


//delete product 

export const deleteProductController=async(req,res)=>{
try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
        success:true,
        message:"Product deleted successfully"
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in deleting Products",
        error
    })
}
}


//update Product
 export const updateProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
    const {photo}=req.files;
   
    switch (true) {
        case !name:
            return res.status(500).send({message:"Name is required"});
        case !description:
            return res.status(500).send({message:"description is required"});
        case !price:
            return res.status(500).send({message:"price is required"});
        case !category:
            return res.status(500).send({message:"category is required"});
        case !quantity:
            return res.status(500).send({message:"quantity is required"});
        case photo && photo.size>1000000:
            return res.status(500).send({message:"Photo is required and size must be less then 1mb"});
    }
    
    const products=await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
    
    if(photo){
        products.photo.data =fs.readFileSync(photo.path);
        products.photo.contentType=photo.type
    }
    await products.save()
    res.status(201).send({
        success:true,
        message:"Product Updated successfull",
        products
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Updating Products",
            error
        })
    }
 }


 //Filter product

export const filterProductController=async(req,res)=>{
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
          success: true,
          products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Filtering Products",
          error,
        });
    }
}


//product count
export const productCountController=async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
          success: true,
          total,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          message: "Error in product count",
          error,
          success: false,
        });
      }
}


// product list base on page
export const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
    });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };

  //search controller
export const searchProductController=async(req,res)=>{
    try {
        const {keyword}=req.params;
        const result=await productModel.find({
            $or:[
                { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-photo")
        res.json(result);
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "error in serch product API",
        error,
      });
    }
}


//similar Products
export const similarProductController=async(req,res)=>{
    try {
        const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "error in geting similar product",
        error,
      });
    }
}

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };

  //payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //payment
export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };