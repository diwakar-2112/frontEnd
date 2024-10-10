import React, { useEffect, useState } from "react";
import "./user_quiz.css";
import { useNavigate } from "react-router-dom";

function User_quiz() {
  const navigator = useNavigate();
  const [categoryTests, setCategoryTests] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(5);

  useEffect(() => {
    fetchCategoryTests();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredTests(categoryTests[selectedCategory] || []);
    }
  }, [selectedCategory, categoryTests]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTests(categoryTests[selectedCategory] || []);
    } else {
      const filtered = (categoryTests[selectedCategory] || []).filter(test =>
        test.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTests(filtered);
    }
  }, [searchQuery, categoryTests, selectedCategory]);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = (filteredTests || []).slice(indexOfFirstTest, indexOfLastTest);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const sortedTests = [...currentTests].sort((a, b) => {
    if (sortBy === "name") {
      return a.tag.localeCompare(b.tag);
    } else {
      return a.id - b.id;
    }
  });

  function fetchCategoryTests() {
    const categories = [
      "Programming",
      "Technical",
      "Mathematics",
      "Science",
      "Social Studies",
      "Language Arts",
      "Business and Finance",
      "Health and Wellness",
      "Arts and Humanities",
      "Others"
    ];

    const categoryPromises = categories.map(category => {
      return fetch(`http://localhost:8080/allAssessment/${category}`)
        .then(response => response.json())
        .then(data => ({ [category]: data instanceof Array ? data : [] }))
        .catch(error => {
          console.error(`There was a problem fetching ${category} tests data:`, error);
          return { [category]: [] };
        });
    });

    Promise.all(categoryPromises)
      .then(categoryData => {
        const categoryTestsData = categoryData.reduce((accumulator, current) => {
          return { ...accumulator, ...current };
        }, {});
        setCategoryTests(categoryTestsData);
      });
  }

  function handleClick(testid) {
    console.log(testid);
    navigator('/instructions', {state: {testid: testid}});
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    setSearchQuery("");
    setCurrentPage(1);
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="User_quiz">
      <div className="user_body">
      <div className="user_main_heading">All Assessments</div>
      <div className="user_quiz_inner">
        <div className="user_left">
          <select value={selectedCategory} onChange={handleCategoryChange} className="category_select">
            <option value="">Select Category</option>
            {Object.keys(categoryTests).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {selectedCategory && (
            <div>
            <div className="search_drop">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search assessments..."
                className="search_input"
              />
              <select value={sortBy} onChange={handleSortChange} className="sort_select">
                <option value="name">Sort by Name</option>
                <option value="id">Sort by ID</option>
              </select>
              </div>
              <div className="all_tests">
                {sortedTests.length === 0 ? (
                  <p>No assessments found.</p>
                ) : (
                  sortedTests.map((test, index) => (
                    <div className="test_list" key={test.id}>
                      <div className="test_name">{test.tag}</div>
                      <div className="test_attempt">
                        <button className="attempt" onClick={() => handleClick(test.id)}>Attempt</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Pagination
                testsPerPage={testsPerPage}
                totalTests={(filteredTests || []).length}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

const Pagination = ({ testsPerPage, totalTests, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTests / testsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default User_quiz;
