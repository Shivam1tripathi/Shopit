import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Profile = () => {
  const navigate=useNavigate();

    // context
const [auth,setAuth]=useAuth();
//state
const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [Phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [sport,setSport]=useState("");
//get userdata
useEffect(()=>{
  const {name,email,Phone,address}=auth?.user;
  setName(name);
  setEmail(email);
  setPhone(Phone);
  setAddress(address);
  setSport();
},[auth?.user])

  return (
   <Layout>
    <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
           <div className='d-flex justify-content-end'>
            <button className='btn btn-danger fw-semibold' onClick={()=>navigate('/dashboard/user/edit-profile')}>Edit Profile</button>
           </div>
           <div className='ms-4'>
            <p className='fs-4 fw-bold'>Name: <span className='fs-5 fw-semibold'>{name}</span></p>
            <p className='fs-4 fw-bold'>Email: <span className='fs-5 fw-semibold'>{email}</span></p>
            <p className='fs-4 fw-bold'>Phone: <span className='fs-5 fw-semibold'>{Phone}</span></p>
            <p className='fs-4 fw-bold'>Address: <span className='fs-5 fw-semibold'>{address}</span></p>
           </div>
          </div>
        </div>
      </div>
   </Layout>
  )
}

export default Profile