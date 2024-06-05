import React, { useEffect, useState } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { Select } from "antd";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params=useParams();
    const [categories,setCategories]=useState([]);
    const [description,setDescription]=useState("")
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [quantity,setQuantity]=useState("")
    const [shipping,setShipping]=useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState("");
  

  //get single product
  const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
        setName(data.products.name);
        setId(data.products._id);
        setPrice(data.products.price);
        setDescription(data.products.description);
        setCategory(data.products.category._id);
        setQuantity(data.products.quantity);
        
        
    } catch (error) {
        console.log(error)
        toast.error("something wentwrong in fetching single data from database");
    }
  }
  useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
  },[])
  
  //get all products
  
  const getAllCategories=async(e)=>{
    try {   
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`);
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
  
  //Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      console.log("1");
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      console.log("2");
      if (data?.success) {
        toast.success("Product Updated Successfully");
        setTimeout(() => {
            navigate("/dashboard/admin/product");
          }, 1000);
      } else {
        toast.error(data?.message);
      }             
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in Updating product");
    }
  };

   //delete a product
   const handleDelete = async () => {
    try {
      let answer = window.prompt(`Write "YES" if you want to delete this product ? `);
      if (answer!=="YES") return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };




  return (
    <Layout title="Dashboard-Update Products">
      <div className="container-fluid p-3 dashboard ">
        <div className="row">
            <div className="col-md-2">
                <AdminMenu/>
            </div>
            <div className="col-md-9 bg-light">
              <h1>Update Products</h1>
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
                value={category}
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
                {photo ?(
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="Product_photo" height={"200px"} className='img img-responsive'/>
                  </div>
                ):(
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`}
                      alt="product_photo"   
                      className="img img-responsive"
                    />
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
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary fw-semibold" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger ms-3 fw-semibold" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
            
        </div>
      </div>  
    </Layout>
  )
}

export default UpdateProduct