import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

function Country() {
  const [countries, setCountries] = useState([]);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  //fetch API
useEffect(function(){
  const getCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  };
  getCountry().then((data) => {
    setCountries(data);
    setFilteredCountries(data);
  })
  .catch((err) =>{
    console.log("rejected",err);
  });
},[]);
  

  // useEffect(function () {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setCountries(data);
  //       setFilteredCountries(data);
  //     })

  //     .catch((err) => {
  //       console.log("rejected", err);
  //     });
  // }, []);

  // search filter

  useEffect(() => {
    const filtered = countries.filter((country) => {
      if (
        country.name.common.toLowerCase().includes(filterText.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setFilteredCountries(filtered);
  }, [filterText, countries]);

  //Pagination

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleBlogData = filteredCountries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="homePage">
        <div className="header-div">
          <h3>Where in the World ?</h3>
          <p style={{ display: "flex", alignItems: "center" }}>
            <img src="light.jfif" alt="light" className="icon" />
            Light Mode
          </p>
        </div>

        <div className="search-div">
          {/* <div className="search-input"> */}
          {/* <img src="search.png" alt="search" className="icon"/> */}
          <input
            className="search"
            type="text"
            placeholder="search for a country"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          {/* </div> */}

          <select>
            <option value="">Filter by</option>
            <option value="region">Region</option>
            <option value="population">Population</option>
            <option value="capital">Capital</option>
          </select>
        </div>
        <div className="country-container">
          {visibleBlogData.map(function (value, index) {
            return (
              <div key={index} className="country-div">
                <img
                  src={value.flags.svg}
                  alt="country-flag"
                  className="country-flag"
                />
                <div style={{ width: "240px", padding: "20px" }}>
                  <p className="country-name">
                    <strong>{value.name.common}</strong>
                  </p>
                  <p className="country-name">
                    <strong>Population: </strong>
                    {value.population}
                  </p>
                  <p className="country-name">
                    <strong>Region: </strong>
                    {value.region}
                  </p>
                  <p className="country-name">
                    <strong>Capital: </strong>
                    {value.capital}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
export default Country;
