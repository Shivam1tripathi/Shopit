import React from 'react'
import Layout from '../component/Layout/Layout'

const About = () => {
  return (
    <Layout title={"SHOPIT-About"}  keywords={"About,Number,Email,24x7"}>
      <div className='Ab'>
        <div className="Ab-left">
          <h1>About us</h1>
          <img src="Images/About.jpg" alt="About us" width={"450px"} />
        </div>
        <div className="Ab-right">
          <p>Shop smarter, not harder. SHOPIT offers a curated selection of all products,all conveniently on your phone.  We value time , providing a seamless app experience  for effortless browsing and secure checkout. Download the app and discover how SHOPIT simplifies shopping</p>
        </div>
      </div>
    </Layout>
  )
}

export default About