import React from 'react'
import Layout from '../component/Layout/Layout'

export const Contact = () => {
  return (
    <Layout title={"S.V.MART-Contact"}  keywords={"Contact,Number,Email,24x7"}  >
      <div className="contact">
        <div className="contact-left">
          <img src='Images/Contact.png' alt="png"style={{width:"100vh"}}/>
        </div>

        <div className="contact-right">
         <h1>Contact Us</h1>
         <p>For any Query and info about product feel free to call <br /> anytime we 24x7 available</p>
         <ul>
          <li>🌐:www.help@Shopit.com</li>
          <li>📞:012-3456789</li>
          <li>🎧:1800-0000-0000(Toll Free)</li>
         </ul>
        </div>
      </div>
    </Layout>
  )
}
