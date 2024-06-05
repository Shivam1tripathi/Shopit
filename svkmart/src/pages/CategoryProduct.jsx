import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart,setCart]=useCart()
  const [category, setCategory] = useState([]);


  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
        <div className="container mt-4">
            <h3 className='text-center'>Category-{category.name}</h3>
            <h6 className='text-center'>{products.length} results found</h6>      
            <div className="row">
            <div className="d-flex flex-wrap">
            {
                     
                     products?.map((p)=>(
                         <>
                         <div className="card m-2" style={{ width: "20rem"}} key={p._id}>
                             <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover" height={"200px"} alt={p.name} />
                             <div className="card-body d-flex flex-column justify-content-end">
                                 <h7>Rs - {p.price}</h7>
                                 <h6 className="card-title">{p.name}</h6>
                                 <p className="card-text">{p.description.substring(0,30)}...</p>
                                 <div>
                                 <button className='btn btn-primary fw-semibold ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>See More Details</button>
                                 <button className='btn btn-secondary fw-semibold ms-1'  onClick={()=>{
                                  setCart([...cart,p]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                  );
                                  toast.success("Product added to the cart");
                                }}>ADD TO CART</button> 
                                 </div>
                             </div>
                         </div> 
                       
                         </>
                     ))
                     
                 }
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct