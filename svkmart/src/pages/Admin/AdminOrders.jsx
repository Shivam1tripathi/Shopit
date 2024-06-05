import React, { useEffect, useState } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu'
import Layout from '../../component/Layout/Layout'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {

    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
      ]);
      const [changeStatus, setCHangeStatus] = useState("");
      const [order, setOrder] = useState([]);
      const [auth, setAuth] = useAuth();

      const getOrders = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
          setOrder(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
    
      const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };
  return (
<Layout title={"All Orders Data"}>
    <div className="container-fluid p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Orders</h1>
                {
              order?.map((o,i)=>{
               return( 
               <div className="border shadow mt-1">
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
                      <td><Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option  key={i} value={s}>
                              <span className="fw-semibold">{s}</span>
                            </Option>
                          ))}
                        </Select></td>
                      <td>{o?.buyer.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success?"Success":"Failed"}</td>
                      <td>{o?.products.length}</td>
                    </tr>
                   </tbody>
                   </table>
                   <div className="container">
                   {
                        o?.products.map((p,i)=>(
                            <div className="row  card flex-row">
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

export default AdminOrders