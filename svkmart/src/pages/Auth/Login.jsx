import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Auth.css"
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const location=useLocation();
    const [auth,setAuth]=useAuth();

    //form function
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
         const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
         if(res.data.success){
          toast.success(res.data.message)
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state ||"/")
           

         }else{
            toast.error(res.data.message)
         }
        }catch(error){
         console.log(error);
         toast.error("Somethig Gone Wrong")
        }
    };

  return (
    <Layout>
      <div className='Auth-box'>
        <div className='Auth-container'>
                <h1> Login</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} className="form-control IC" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} className="form-control IC" id="exampleInputPassword1" onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>
                    <div className="button-lc">
                    <button type="submit" className="btn btn-primary Auth-btn">Login</button>
                    <button type="button" onClick={()=>{ navigate("/forget-password")}} className="fp-button">Forgot Password</button>
                    </div>
                    
                </form>

        </div>
      </div>
        

    </Layout>
    
  )
}

export default Login