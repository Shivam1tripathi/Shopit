import React from 'react'

const CategoryForm = ({handlesubmit,value,setvalue}) => {
  return (
    <form onSubmit={handlesubmit}>
  <div className="mb-3 me-4">
    <input type="text" placeholder='Create Category......' className="form-control border-2 border-info-subtle" value={value} onChange={(e)=>{setvalue(e.target.value)}} />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>

  )
}

export default CategoryForm