import React from 'react'
import Layout from '../component/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate();
  return (
    <Layout title={"Search results"}>
        <div className="container">
            <div className="text-center">
                <h1>Search results</h1>
                <h6>{values?.results.length <1 ? 'No result found': `Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap">
            {
                     
                     values?.results.map((p)=>(
                         <>
                         <div className="card m-2" style={{ width: "20rem"}} key={p._id}>
                             <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${p._id}`} className="card-img-top image-cover" height={"200px"} alt={p.name} />
                             <div className="card-body d-flex flex-column justify-content-end">
                                 <h7>Rs - {p.price}</h7>
                                 <h6 className="card-title">{p.name}</h6>
                                 <p className="card-text">{p.description.substring(0,30)}...</p>
                                 <div>
                                 <button className='btn btn-primary fw-semibold ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>See More Details</button>
                                 <button className='btn btn-secondary fw-semibold ms-1'>ADD TO CART</button> 
                                 </div>
                             </div>
                         </div> 
                       
                         </>
                     ))
                     
                 }
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search