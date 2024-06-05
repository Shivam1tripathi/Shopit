import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Auth.css"


const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [Phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();

    //form function
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
         const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,Phone,address,answer});
         if(res.data.success){
            
            navigate("/login")
            toast.success(res.data.message)

         }else{
            toast.error(res.data.message)
         }
        }catch(error){
         console.log(error);
         toast.error("Somethig Gone Wrong")
        }
    };

  return (
    <Layout title={"S.V.MART-Register"} keywords={"Register,SignUp"}>
   <div className='Auth-box'>
      <div className="Auth-container">
            <h1>REGISTER FORM</h1>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                   <input type="text" className="form-control IC" id="exampleInputEmail1" value={name} placeholder='Enter Full Name' onChange={(e)=>{setName(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="email" className="form-control IC" value={email} id="exampleInputEmail1" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}} required />
                </div>
                <div className="mb-3">
                   <input type="password" className="form-control IC" value={password} id="exampleInputPassword1" placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="text" className="form-control IC" value={Phone} id="exampleInputEmail1" placeholder='Enter Phone Number' onChange={(e)=>{setPhone(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="text" className="form-control IC" value={address} id="exampleInputEmail1" placeholder='Enter Address' onChange={(e)=>{setAddress(e.target.value)}} required/>
                </div>
                <div className="mb-3">
                   <input type="text" className="form-control IC" value={answer} id="exampleInputEmail1" placeholder='What is your Favorite sport' onChange={(e)=>{setAnswer(e.target.value)}} required/>
                </div>

                
                <button type="submit" className="btn btn-primary Auth-btn">Register</button>
            </form>
      </div>
   </div>
    </Layout>
  )
}

export default Register