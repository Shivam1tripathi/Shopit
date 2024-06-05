import React from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"S.V.MART-Dashboard"}>
        <div className="container-flui p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h4>{auth?.user?.name}</h4>
                <h4>{auth?.user?.email}</h4>
                <h4>{auth?.user?.Phone}</h4>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard