import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { Modal } from "antd";
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../component/Forms/CategoryForm'
const CreateCategory = () => {
  const [Categories,setCategories]=useState([]);
  const [name,setName]=useState("");
  const [visible,setVisible]=useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data?.success){
        toast.success(`${name} is created`);
        getAllCategories();
      }else{
        toast.error(data.message)
      }
      setName("");
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input form")
    }
  }

  
  const getAllCategories=async(e)=>{
    try {   
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`);
      
      if(data?.success){
        setCategories(data?.Categorys);
      }
     
    }catch (error) {
      console.log(error)
      toast.error("something wentwrong in fetching data from database");
    }
  }
  useEffect(()=>{
    getAllCategories();
  },[])

  
  //update category
  const handleUpdate=async(e)=>{

    e.preventDefault();
   
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      console.log(updatedName);
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //delete category
  const handledelete=async(dlt)=>{
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/deletecategory/${dlt}`
      );
      if (data?.success) {
        toast.success(`Category is deleted successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid p-3">
        <div className="row">
            <div className="col-md-3">
              
                <AdminMenu/>
            </div>
            <div className="col-md-6">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm handlesubmit={handlesubmit} value={name} setvalue={setName}/>
              </div>
              <div className='w-75'>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                          {
                            Categories?.map((c)=>(
                              <tr>
                              <td  key={c._id}>{c.name}</td>
                             <td > 
                              <button type="button" onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c) }} class=" btn btn-primary fw-semibold ms-2">Edit</button>
                              <button type="button" onClick={()=>handledelete(c._id)} class=" btn btn-danger fw-semibold ms-2">Delete</button>
                             </td>
                              </tr>
                            ))
                          }
                       
                      </tbody>
                    </table>      
              </div>
              <Modal
              onCancel={(e) =>{setVisible(false)}}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setvalue={setUpdatedName}
                handlesubmit={handleUpdate}
              />
            </Modal>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory