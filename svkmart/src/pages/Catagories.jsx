import React from 'react'

import { Link } from 'react-router-dom'
import Layout from '../component/Layout/Layout'
import useCategory from '../hooks/useCategory'


const Catagories = () => {
    const catagories=useCategory();
  return (
    <Layout title={"All Categories"}>
        <div className="container mt-3">
            <div className="row">
                <h1 className='text-center fw-bold'>ALL CATEGORIES</h1>
            </div>
            <div className="row container">
                {
                    catagories.map((c)=>(
                        <div className="col-md-3 mt-5 mb-3 gx-3 gy-3 " key={c._id}>
                            <div className="card">
                            <Link className='btn cat-btn' to={`/category/${c.slug}`}>{c.name}</Link>
                            </div> 
                        </div>
                    ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default Catagories