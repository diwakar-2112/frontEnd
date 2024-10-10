import './App.css';

import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './container/login_signup/Login';
import Admin_Login from './container/login_signup/Admin_Login';
import Signup from './container/login_signup/SignUp';
import Admin_dashboard from './Admin_dashboard';
import Test_form from './container/test_form/Test_form';
import Ques_form from './container/Ques_form/Ques_form';
import Assessments from './Assessment';
import Attempt from './container/Attempt/Attempt';
import Edit_ques from './container/edit_ques/Edit_ques';
import Result from './container/Result/Result';
import { useEffect, useState } from 'react';
import Error from './components/Error/ErrorPage';
import EditQuestions from './container/EditQuestions/EditQuestions';
import Instructions from './container/instructions/Instruction';
import Form_edit from './container/Edit_ques_form/form';
import ErrorPage from './components/Error/ErrorPage';

function App() {

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
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/admin' element={<Admin_dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/login_admin' element={<Admin_Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/test_form' element={<Test_form />}></Route>
          <Route path='/ques_from' element= {<Ques_form/>}></Route>
          <Route path='/assessments' element ={data? <Assessments/> :<Error/>}></Route>
          <Route path='/attempt' element ={<Attempt/> }></Route>
          <Route path='/edit_ques' element ={<Edit_ques/> }></Route>
          <Route path='/result' element={<Result />}></Route>
          <Route path='/editQuestions' element={<EditQuestions />}></Route>
          <Route path='/instructions' element={<Instructions />}></Route>
          <Route path='/edit_ques_form' element={<Form_edit />}></Route>

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
