import React, { useState,useEffect } from 'react'
import Layout from '../component/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const navigate=useNavigate();
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const [clientToken,setClientToken]=useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

     //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

     //remove item
    const removeCartItem=(pid)=>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
          } catch (error) {
            console.log(error);
          }
    }

    //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);


 //handle payments
 const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Shopit-Cart"}>
        <div className="container mb-4">
            <div className="row mt-2">
                <div className="col-md-12">
                    <h1 className='text-center text-info-emphasis bg-light p-2 fw-bold'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                    <h5 className="text-center">{cart.length>1?`you have ${cart.length} items in your cart ${auth?.token?"":"Please login to checkout"}`:"No Item in the cart"}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 ">
                    {
                        cart.map(p=>(
                            <div className="row mt-4 card flex-row">
                                <div className="col-md-4">
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover" height={"150px"} alt={p.name} />
                                </div>
                                <div className="col-md-6">
                                <h6>Price - {p.price}</h6>
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,30)}...</p>
                                </div>
                                <div className="col-md-2 d-flex align-items-center ">
                                    <button className="btn btn-danger fw-semibold" onClick={()=>{removeCartItem(p._id)}}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-4 text-center">
                    <h4>Cart Summary</h4>
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total: {totalPrice()}</h4>
                    {auth?.user?.address?(
                        <>
                        <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/edit-profile')}>Update Address</button>
                        </div>
                        </>
                    ):(
                        <div className="md-3">
                            {auth?.token?(
                                <button className='btn btn-outline-warning'  onClick={()=>navigate('/dashboard/user/edit-profile')}>Update Address</button>
                            ):(
                                <button className='btn btn-outline-warning' onClick={()=>navigate('/login',{state:"/cart"})}>Please Login to chekout</button>
                            )}
                            
                        </div>
                    )}
                    <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        googlePay:{
                            flow:"vault"
                        },
                      }}
                      onInstance={(instanse) => setInstance(instanse)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage