"use client";
import React, { useState, useEffect } from "react";
import { fetchCities } from "@/lib/api";
import Image from "next/image";

interface City {
  id: number;
  name: string;
  country: string;
  countryCode: string;
}

const Home = () => {
  const defaultLimit = 5;
  const maxLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(defaultLimit);
  const [cities, setCities] = useState<City[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [warning, setWarning] = useState("");
  // const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async (name: string, page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;
      const data = await fetchCities(name, limit, offset);
      console.log(data);
      setCities(data.data);
      setTotalPages(Math.ceil(data.metadata.totalCount / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("Axi", currentPage, limit);
  }, [currentPage, limit]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > maxLimit) {
      setWarning(`Limit cannot exceed ${maxLimit}.`);
    } else {
      setWarning("");
      setLimit(value);
      fetchData("Axi", currentPage, value);
    }
  };

  // const handleSearch = async (value: string) => {
  //   setSearchTerm(value);
  //   fetchData(value, currentPage, limit);
  // };

  // const handleKeyboardShortcut = (event: KeyboardEvent) => {
  //   if ((event.ctrlKey || event.metaKey) && event.key === "/") {
  //     event.preventDefault();
  //     searchInputRef.current?.focus();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyboardShortcut);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyboardShortcut);
  //   };
  // }, []);

  return (
    <>
      <div className="search-input">
        <span className="search">
          <input
            type="text"
            className="custom-element"
            placeholder="Search..."
            // onChange={(e) => handleSearch(e.target.value)}
            // ref={searchInputRef}
          />
          <span className="keyboard-shortcut">Ctrl+/</span>
        </span>
      </div>
      <div className="limit-input">
        <label htmlFor=""> Default is 5 and max is 10</label>
        <input
          type="number"
          value={limit}
          min="1"
          max={maxLimit}
          onChange={handleLimitChange}
          className="limit-toggle"
        />
        {warning && <span className="error-limit">{warning}</span>}
      </div>
      <div className="table">
        <table id="myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {cities?.map((city, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>
                  <Image
                    src="https://flagsapi.com/city.countryCode/flat/64.png"
                    width={64}
                    height={64}
                    alt=""
                  />

                  {city.country}
                  {}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
