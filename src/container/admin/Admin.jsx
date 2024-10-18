import React, { useEffect, useState } from "react";
import "./admin.css";
import { useNavigate, useNavigation } from "react-router-dom";
import ed from '../../Assets/edit.svg';
import de from '../../Assets/delete.svg';
import edit from '../../Assets/icons8-edit (1).svg';
import del from '../../Assets/icons8-delete (1).svg';

function Admin() {
  const navigator = useNavigate();
  function handleDelete(id) {
    fetch(`http://localhost:8080/deleteAssessment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Reload the data after successful deletion
        fetchData();
        return response.json();
      })
      .then((data) => {
        console.log("Delete successful", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  function handleEdit(id){
    navigator('/editquestions', {state: {testid: id}});
  }



  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  function fetchData() {
    fetch("http://localhost:8080/allAssessment")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  }
  function addTest() {
    navigator("/test_form");
  }

  console.log('data is',Data);

  return (
    <div className="Admin main">
      <div className="admin_section">
        <div className="admin_heading">
          <h1>All Assessments </h1>
        </div>
        <div className="admin_main">
          <div class="container admin nav">
            <ol class="responsive-table list gradient-list">
              <li class="table-header num h3">
                <div class="col col-1 ">S No.</div>
                <div class="col col-2 ">Tags</div>
                <div class="col col-3 ">Questions</div>
                <div class="col col-4 ">Tests Taken</div>
                <div class="col col-5 ">Edit</div>
                <div class="col col-6 ">Delete</div>
              </li>

              {Data.length === 0 ? (
                <p>Loading....</p>
              ) : (
                Data.map((test,index) => (
                  <li class="table-row num h3 " key={parseInt(test.id)}>
                    <div class="col col-1" data-label="Id">
                      {index+1}
                    </div>
                    <div class="col col-2" data-label="Name">
                      {test.tag}
                    </div>
                    <div class="col col-3 ques_" data-label="Ques">
                      {test.questions}
                    </div>
                    <div class="col col-4 test_" data-label="Test taken">
                      {test.testTaken}
                    </div>
                    <div class="col col-5" data-label="Edit">
                      <div
                        className="admin_button"
                        onClick={() => handleEdit(test.id)}
                      >
                        <img src={edit} className="icons_"/>
                      </div> 
                    </div>
                    <div class="col col-6" data-label="Delete">
                      <div
                        className="admin_button"
                        onClick={() => handleDelete(test.id)}
                      >
                        <img src={del} className="icons_ delete_"/>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
          <div className="add_test">
            <button className="add_test_btn" onClick={addTest}>
              Add Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
