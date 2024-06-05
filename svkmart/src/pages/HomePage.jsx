import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox,Radio } from 'antd';
import { Prices } from '../component/Price';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import {Badge} from 'antd';

const HomePage = () => {
  const [auth]=useAuth();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setchecked]=useState([]);
  const [radio,setRadio]=useState([]);

  const navigate=useNavigate();



  //get all categories

  const getAllCategories=async(e)=>{
    try {   
     
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`);
      
      if(data?.success){
        setCategories(data?.Categorys);
      }
     
    }catch (error) {
      console.log(error)
      toast.error("something wentwrong in getting category from database");
    }
  }

  useEffect(()=>{
    getAllCategories();
  },[])


//get all products
  const getAllProduct=async()=>{
      try {
          const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
          setProduct(data.product);  
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
      }
  }


  

   //filter by category
   const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id);
    }else{
    all=all.filter((c)=>c!==id);
    }
    setchecked(all);
  }
   

  useEffect(()=>{
    if (!checked.length || !radio.length){
      getAllProduct();
    }
  },[checked.length, radio.length])

  useEffect(()=>{
    console.log(checked.length)
    if (checked.length || radio.length){
      filterProduct();
    } 
  },[checked, radio])

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}  keywords={"Home,Shoping,Login,signup,Register,SvMart"}>
      <div className="container-fluid p-3 dashboard ">
        <div className="row ">
          <img src="Images/online-store.jpg" alt="Online shoping" className=' banner' />
        </div>
        <div className="row mt-3">
          <div className="col-md-2 border-end mt-4">
            <h4 className="text-center fw-semibold">Filter By Category</h4>
            <div className='d-flex flex-column'>
              {categories?.map((c)=>{
               return <Checkbox className='fs-6 fw-semibold' key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                {c.name}
                </Checkbox>
              })}
            </div>
            <h4 className="text-center fw-semibold mt-3">Filter By Category</h4>
            <div className='d-flex flex-column'>
             <Radio.Group className='fs-6 fw-semibold' onChange={(e)=>setRadio(e.target.value)}>
              {Prices.map((p)=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
             </Radio.Group>
            </div>
            <div className='d-flex flex-column mt-3'>
             <button className='btn btn-danger fw-semibold' onClick={()=>window.location.reload()}>Reset Filter</button>
            </div>
          </div>
          <div className="col-md-10 ">
           
            <h2 className="text-center fw-semibold">All Products</h2>
            <div className="d-flex flex-wrap">
            {
                     
                     product?.map((p)=>(
                         <>
                         <div className="card m-2" style={{ width: "20rem"}} key={p._id}>
                          <div style={{height:"220px"}}> 
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover prs" height={"200px"} alt={p.name} />
                            </div>
                             <div className="card-body d-flex flex-column justify-content-end">
                                 <h7>Rs - {p.price}</h7>
                                 <h6 className="card-title">{p.name}</h6>
                                 <p className="card-text">{p.description.substring(0,30)}...</p>
                                 <div>
                                 <button className='btn btn-primary fw-semibold ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>See More Details</button>
                                 <button className='btn btn-secondary fw-semibold ms-1' 
                                 onClick={()=>{
                                  setCart([...cart,p]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                  );
                                  toast.success("Product added to the cart");
                                }}
                                >ADD TO CART</button> 
                                 </div>
                             </div>
                         </div> 
                       
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

export default HomePage

// <h1>HomePage</h1>
//         <pre>{JSON.stringify(auth,null,4)}</pre>
//           {JSON.stringify(radio,null,4)}