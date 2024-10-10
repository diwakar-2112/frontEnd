import React, { useEffect, useState } from 'react'
import Navbar3 from './container/navbar/Navbar3';
import Admin from './container/admin/Admin';
import './admin_dashboard.css';
import ErrorPage from './components/Error/ErrorPage';

function Admin_dashboard() {

  const[data,setData] = useState();
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  
  function fetchData() {
    fetch("http://localhost:8080/checkSessionAdmin")
        .then((response) => response.json())
        .then((data) => {
            setData(data); // Update state with fetched data
        })
        .catch((error) => {
            console.error("There was a problem fetching the data:", error);
        });
  }
  if(data==true){
  return (
    <div className='Admin_dashboard'>
        <Navbar3 />
        <Admin />
    </div>
  )
  }
  else{
    return (
      <div >
          <ErrorPage/>
      </div>
    )
  }
}

export default Admin_dashboard