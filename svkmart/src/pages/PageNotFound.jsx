import React from 'react'
import Layout from '../component/Layout/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <Layout title={"PAGE NOT FOUND"}  keywords={"Error"}>
       <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-p'>Page Not Found</h2>
       <Link to="/" className='pnf-button'>Go Back</Link>
       </div>
    </Layout>
  )
}

export default PageNotFound