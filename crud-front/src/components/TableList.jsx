import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TableList({handleOpen, searchTerm}) {
const [tableData, setTableData] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async() => {
    try {
      const response = await axios.get('http://localhost:3002/api/clients');
      console.log(`Check Response API`, response);
      setTableData(response.data);
    } catch (error) {
      setError(error.message)
    }
  }
  fetchData();
},[])


const handleDelete = async(id) => {
  const confirmDelete = window.confirm('Are you sure yoy want to delete this clients');
  if(confirmDelete) {
    try {
      await axios.delete(`http://localhost:3002/api/clients/${id}`);
      setTableData((prevData) => prevData.filter(client => client.id !== id))
    } catch (error) {
      setError(error.message)
    }
  }
}

  return (
    <>
      {error && <div className='alert alert-error'>{error}</div>}
      
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover" >
            {tableData.map((table) => (
              <tr key={table.id}>
                <td>{table.id}</td>
                <td>{table.name}</td>
                <td>{table.email}</td>
                <td>{table.job}</td>
                <td>{table.rate}</td>
                <td>
                  <button className={`btn rounded-full w-20 ${table.isactive ? `btn-primary` : `btn-outline btn-primary`}`}>
                      {table.isactive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleOpen('edit', table)} className='btn btn-secondary'>Update</button>
                </td>
                <td>
                    <button className="btn btn-accent" onClick={() => handleDelete(table.id)}>Delete</button>
                </td>
              </tr>
            ))}           
          </tbody>
        </table>
      </div>
    </>
  );
}
