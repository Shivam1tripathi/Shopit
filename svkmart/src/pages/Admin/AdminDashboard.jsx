import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Dashboard-Admin"}>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9 ">
              <div className="card w-75 p-3">
                <h3>{auth?.user?.name}</h3>
             <h3>{auth?.user?.email}</h3>
             <h3>{auth?.user?.Phone}</h3></div> 
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard