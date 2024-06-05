import React from 'react'
import Layout from '../component/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"S.V.MART-Policy"}  keywords={"Policy,Privacy,Security,24x7"}>
       <div className="Policy">

        <div className="Policy-left">
          <img src='Images/PrivacyPolicy.jpeg' alt="PrivacyPolicy"style={{width:"75vh"}}/>
        </div>

        <div className="Policy-right">
          <h1>Privacy & Policy</h1>
        <p>
        Welcome to Shopit webiste. We value your privacy and are committed 
        to protecting your personal information. This Privacy Policy explains 
        how we collect, use, disclose, and safeguard your information when you 
        visit our website or engage with our services .
        Please read this Privacy Policy carefully. If you do not agree with the 
        terms of this Privacy Policy, please do not access the Services
        </p>
        <h3>Information We Collect</h3>
        <h5>We may collect and process the following types of information about you:</h5>
        <h6>Personal Information:</h6>
        <ul className='info'>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Mailing address</li>
          <li>Payment information (such as credit card details)</li>
        </ul>
        </div>

      </div>
    </Layout>
  )
}

export default Policy