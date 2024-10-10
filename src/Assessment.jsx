import React, { useEffect, useState } from 'react';
import Navbar4 from './container/navbar/Navbar4';
import User_quiz from './container/user_quiz/User_quiz';
import ErrorPage from './components/Error/ErrorPage';

function Assessments() {
  const[data,setData] = useState();
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  
  function fetchData() {
    fetch("http://localhost:8080/checkSession")
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
    <div className='Assessments'>
        <Navbar4 />
        <User_quiz />
    </div>
  )
}
else{
  console.log(data);
  return (
    <div>
      <ErrorPage />
    </div>
  )
}
}

export default Assessments;