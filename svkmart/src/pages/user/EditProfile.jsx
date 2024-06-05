import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const navigate=useNavigate();
  // context
const [auth,setAuth]=useAuth();
  //state
  const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [Phone,setPhone]=useState("");
    const [address,setAddress]=useState("");

    //get userdata
    useEffect(()=>{
      const {name,email,Phone,address}=auth?.user;
      setName(name);
      setEmail(email);
      setPhone(Phone);
      setAddress(address);
    },[auth?.user])

     //form function
     const handlesubmit = async(e)=>{
      e.preventDefault();
      try{
       const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,
        email,
        password,
        Phone,
        address,});
        console.log(data)
      
       if(data?.error){
        toast.error(data?.error);
       }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success("Profile updated successfully")
       }
      }catch(error){
       console.log(error);
       toast.error("Somethig Gone Wrong")
      }
  };


  return (
    <Layout>
    <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
          <div className='Auth-box2'>
      <div className="Auth-container">
            <h1>User Profile</h1>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                   <input type="text" className="form-control IC" id="exampleInputEmail1" value={name} placeholder='Enter Full Name' onChange={(e)=>{setName(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="email" className="form-control IC" value={email} id="exampleInputEmail1" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}} required  disabled/>
                </div>
                <div className="mb-3">
                   <input type="password" className="form-control IC" value={password} id="exampleInputPassword1" placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="mb-3">
                   <input type="text" className="form-control IC" value={Phone} id="exampleInputEmail1" placeholder='Enter Phone Number' onChange={(e)=>{setPhone(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="text" className="form-control IC" value={address} id="exampleInputEmail1" placeholder='Enter Address' onChange={(e)=>{setAddress(e.target.value)}} required/>
                </div>
               

                
                <button type="submit" className="btn btn-primary Auth-btn">Update</button>
            </form>
      </div>
   </div>
          </div>
        </div>
      </div>
   </Layout>
  )
}

export default EditProfile