import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import Searchinput from '../Forms/Searchinput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import {Badge} from 'antd';




const Header = () => {
  const [auth,setAuth]=useAuth();
  const [cart]=useCart();
  const catagories=useCategory();
  const handleLogout=()=>{
    setAuth({...auth,user:null,token:""})
    localStorage.removeItem('auth');
    toast.success("Logout Successfull")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand" href="#"> 
       🛍️Shopit
      </Link>

      <ul className="navbar-nav pr ms-auto mb-2 mb-lg-0">
        <Searchinput/>
        <li className="nav-item ">
          <NavLink to="/" className="nav-link " aria-current="page" href="#">Home</NavLink>
        </li>
        
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {catagories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>



         {/* ===================Login/Register controling============================  */}
       {
        !auth.user ?(
      <> 
        <li className="nav-item">
        <NavLink to="/register" className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/Login" className="nav-link " >Login</NavLink>
        </li>

      </>
      ):(
      <>
      <li className="nav-item dropdown ps">
  <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
  {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu ">
    <li><NavLink to={`/Dashboard/${auth?.user?.role===1?"admin":"user"}`} className="dropdown-item ">Dashboard</NavLink></li>
    <li><NavLink to="/Login" onClick={handleLogout} className="dropdown-item ">Logout</NavLink></li>
    
  </ul>
</li>

      </>
      )
       }
        <li className="nav-item">
        <NavLink to="/cart" className="nav-link">
        Cart<Badge count={cart?.length} showZero offset={[3, -5]}>   
                  </Badge>
                </NavLink>   
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header