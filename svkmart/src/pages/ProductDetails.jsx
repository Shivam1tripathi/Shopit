import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

const ProductDetails = () => {
    const params=useParams();
    const[product,setProduct]=useState({});
    const [cart,setCart]=useCart();
    const[similarproduct,setSimilarProduct]=useState([]);
    const navigate=useNavigate();


    //initial details
    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])

    //getProduct
const getProduct=async ()=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
        getSimilarProduct(data?.products._id, data?.products.category._id);
        setProduct(data?.products)
        
    } catch (error) {
        console.log(error)
    }
}

//get similar product
const getSimilarProduct = async (pid, cid) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
    );
    setSimilarProduct(data?.products);
  } catch (error) {
    console.log(error);
  }
};



  return (
    <Layout>
      <div className="container mt-4">
       <div className="row product-details">
        <div className="col-md-5">
        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top image-cover" height={"400px"} alt={product.name} />
        </div>
        <div className="col-md-5 product-details-info">
        <h1 className="text-center">Product Details</h1>
          <hr />
          <h6><strong>Name</strong> : {product.name}</h6>
          <h6><strong>Description</strong> : {product.description}</h6>
          <h6>
            <strong>Price</strong> :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6><strong>Category</strong> : {product?.category?.name}</h6>
          <button class="btn btn-secondary fw-bold" onClick={()=>{
                                  setCart([...cart,product]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, product])
                                  );
                                  toast.success("Product added to the cart");
                                }}>ADD TO CART</button>
        </div>
       </div>
       {
        similarproduct.length>0 ?
       <div className="row mb-4">
        <h1>Similar Products</h1>
        {
                     
                     similarproduct?.map((p)=>(
                         <>
                         <div className="card m-2" style={{ width: "15rem"}} key={p._id}>
                         <div style={{height:"110px"}}> 
                             <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover prst mt-2" height={"100px"} alt={p.name} />
                          </div>
                             <div className="card-body d-flex flex-column justify-content-end">
                                 <h7>Rs - {p.price}</h7>
                                 <h6 className="card-title">{p.name}</h6>
                                 <p className="card-text">{p.description.substring(0,30)}...</p>
                                 <div>
                                 <button className='btn btn-primary fw-semibold ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>See More Details</button>
                                 </div>
                             </div>
                         </div> 
                         </>
                     ))
                     
                 }
       </div>:""
}
       </div>
    </Layout>
  )
}

export default ProductDetails