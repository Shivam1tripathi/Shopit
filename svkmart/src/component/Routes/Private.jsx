import { useEffect,useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";


export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
   
    useEffect(() => {
        const authCheck = async () => {
          console.log("start");
          const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
          console.log(res.data);
          if(res.data.ok) {
            setOk(true);
          }else{
            setOk(false);
          }
        };
        if (auth?.token) authCheck();
      }, [auth?.token]);
    console.log(ok);
      return ok ? <Outlet/> : <Loader/>;
}