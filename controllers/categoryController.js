import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//create category
export const createCategoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).send({
                message:"name is required"
            })
        }
        const existcheck=await categoryModel.findOne({name});
        if(existcheck){
            return res.status(200).send({
                success:true,
                message:"Category with this name is already exist"
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"new category created",
            category
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Something gone wrong in category",
            error
        })
    }
}

//Update Category
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        return res.status(201).send({
            success:true,
            message:"Category Upadated successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Something gone wrong in updating category",
            error
        })
    }
}

// Get All Category
export const getAllCategory=async(req,res)=>{
    try {
        const Categorys=await categoryModel.find({});
        if(!Categorys){
            return res.status(401).send({
                success:false,
                message:"No Category exist",
            })
        }
        return res.status(201).send({
            success:true,
            message:"All category Are here",
            Categorys,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something gone wrong in Geting all category",
            error
        })
    }
}

// Get Single Category

export const singleCategory=async(req,res)=>{
    try {
        const Categorys=await categoryModel.findOne({slug:req.params.slug})
        if(!Categorys){
            return res.status(401).send({
                success:false,
                message:"No Category exist with this ID",
            })
        }
        return res.status(201).send({
            success:true,
            message:"category with this slug is here",
            Categorys,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something gone wrong in Geting category",
            error
        })
    }
}

//delete Category
export const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findById(id);
        
        if(!category){
            return res.status(401).send({
                success:false,
                message:"No Category exist with this ID",
            })
        }
        await categoryModel.findByIdAndDelete(id);
        return res.status(201).send({
            success:true,
            message:"category with this id hasbeen deleted",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something gone wrong in deleting category",
            error
        })
    }
}