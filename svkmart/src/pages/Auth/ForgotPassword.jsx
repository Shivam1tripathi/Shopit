import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Auth.css"
const ForgotPassword = () => {
  const [email,setEmail]=useState("");
    const [newpassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();
 

    //form function
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
         const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/Forget-Password`,{email,answer,newpassword});
         if(res.data.success){
          toast.success(res.data.message)
            navigate("/login")
           

         }else{
            toast.error(res.data.message)
         }
        }catch(error){
         console.log(error);
         toast.error("Somethig Gone Wrong")
        }
    };
  return (
    <Layout title={"S.V.MART-forgetpassword"}>
        <div className='Auth-box'>
        <div className='Auth-container'>
                <h1>Reset Password</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} className="form-control IC" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Your Favorite Sport Name </label>
                        <input type="text" value={answer} className="form-control IC" id="exampleInputEmail1" onChange={(e)=>{setAnswer(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                        <input type="password" value={newpassword} className="form-control IC" id="exampleInputPassword1" onChange={(e)=>{setNewPassword(e.target.value)}} />
                    </div>
                    <div className="button-lc">
                    <button type="submit" className="btn btn-primary Auth-btn">Reset</button>
                    </div>
                    
                </form>

        </div>
      </div>
        

    </Layout>
  )
}

export default ForgotPassword