import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';



export default function Layout({children,title,description,keywords,author}){
    return(
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author} />

                <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:"75vh"}}>
        <Toaster />
        
        {children}
        </main> 
        <Footer/>
    </div>
    )
}
Layout.defaultProups={
    title:"S.V.MART",
    description:"Mer stack project" ,
    keywords:"Mern-stack,React,MongoDb,Node.js",
    author:"Shivam Tripathi"
}