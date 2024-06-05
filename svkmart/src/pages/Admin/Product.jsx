import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Product = () => {
    const [product,setProducts]=useState([]);
    const getAllProduct=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.product);  
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
        getAllProduct();
    },[])
  return (
<Layout title="Dashboard-Products">
    <div className="container-fluid p-3 dashboard ">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Products List</h1>
                <div className="d-flex flex-wrap">
                {
                     
                    product?.map((p)=>(
                        <>
                        <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                        <div className="card m-2" style={{ width: "18rem"}} key={p._id}>
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover" height={"270px"} alt={p.name} />
                            <div className="card-body">
                                <h6>Price - {p.price}</h6>
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                            </div>
                        </div> 
                        </Link>
                        </>
                    ))
                    
                }
                </div> 
            </div>
        </div>
        </div>
</Layout>
  )
}

export default Product