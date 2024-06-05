import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
  const [order,setOrder]=useState([]);
  const [auth,setAuth]=useAuth();
  const getorders=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
      setOrder(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token)getorders();
  },[auth?.token])
  return (
    <Layout>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Orders</h1>
            {/* <p>{JSON.stringify(order,null,4)}</p> */}
            
            {
              order?.map((o,i)=>{
               return( 
               <div className="border shadow mt-4">
                   <table className="table">
                    <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Buyer</th>
                      <th scope='col'>date</th>
                      <th scope='col'>Payment</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                    </thead>
                   <tbody>
                    <tr>
                      <td>{i+1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success?"Success":"Failed"}</td>
                      <td>{o?.products.length}</td>
                    </tr>
                   </tbody>
                   </table>
                   <div className="container mb-2">
                   {
                        o?.products.map((p,i)=>(
                            <div className="row  card flex-row ">
                                <div className="col-md-4">
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover" height={"150px"} alt={p.name} />
                                </div>
                                <div className="col-md-6">
                                <h6>Price - {p.price}</h6>
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,30)}...</p>
                                </div>
                                
                            </div>
                        ))
                    }
                   </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders