import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./component/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./component/Routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProducts from "./pages/Admin/CreateProducts";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Catagories from "./pages/Catagories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import EditProfile from "./pages/user/EditProfile";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/categories" element={<Catagories/>} />
      <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/Login" element={<Login/>} />
      
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>} />
      <Route path="user/profile" element={<Profile/>} />
      <Route path="user/edit-profile" element={<EditProfile/>} />
      <Route path="user/order" element={<Orders/>} />
      </Route>

      <Route path="/dashboard" element={<AdminRoutes/>}>
      <Route path="admin" element={<AdminDashboard/>} />
      <Route path="admin/create-category" element={<CreateCategory/>} />
      <Route path="admin/create-product" element={<CreateProducts/>} />
      <Route path="admin/product/:slug" element={<UpdateProduct/>} />
      <Route path="admin/product" element={<Product/>} />
      <Route path="admin/users" element={<Users/>} />
      <Route path="admin/orders" element={<AdminOrders/>} />
      </Route>
      
      <Route path="/Register" element={<Register/>} />
      <Route path="/forget-password" element={<ForgotPassword/>}/>
      <Route path="/About" element={<About/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Policy" element={<Policy/>} />
      <Route path="/*" element={<PageNotFound/>} />
    </Routes>

    </>
  );
}

export default App;
