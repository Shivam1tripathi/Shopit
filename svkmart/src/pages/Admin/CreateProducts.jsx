import React, { useEffect, useState } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { Select } from "antd";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const { Option } = Select;


const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories,setCategories]=useState([]);
  const [description,setDescription]=useState("")
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  const [photo, setPhoto] = useState("");



//get all products

const getAllCategories=async(e)=>{
  try {   
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`);
    console.log(data);
    if(data?.success){
      setCategories(data?.Categorys);
    }
   
  }catch (error) {
    console.log(error)
    toast.error("something wentwrong in fetching data from database");
  }
}
useEffect(()=>{
  getAllCategories();
},[])

//create product function
const handleCreate = async (e) => {
  e.preventDefault();
  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    console.log("1");
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/product/create-product`,
      productData
    );
    console.log("2");
    if (data?.success) {
      toast.success("Product Created Successfully");
      setTimeout(() => {
        navigate("/dashboard/admin/product");
      }, 1000);
      
      
      
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};



  return (
    <Layout title="Dashboard-Create Products">
      <div className="container-fluid p-3 dashboard ">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9 bg-light">
              <h1>Create Products</h1>
              <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              </div>
              <div className="mb-3">
              <label className='btn btn-outline-secondary col-md-9'>
                {photo ? photo.name:"Upload image"}
                <input type="file" name='photo' accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}}hidden/>
              </label>
              </div>
              <div className="mb-3">
                {photo &&(
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="Product_photo" height={"200px"} className='img img-responsive'/>
                  </div>
                )}
              </div>
              <div className="mb-3 col-md-9">
                <h6>Name</h6>
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-9">
              <h6>Description</h6>
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-9">
              <h6>Set Price</h6>
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-9">
                <h6>Quantity</h6>
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-9">
                <h6>Shipping status</h6>
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
              
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
            
        </div>
      </div>  
    </Layout>
  )
}

export default CreateProducts