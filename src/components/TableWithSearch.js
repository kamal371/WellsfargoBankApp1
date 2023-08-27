import React, { useState, useEffect } from 'react';
import './TableWithSearch.css';
var index=0;
const TableWithSearch = ({ tableData }) => {
  console.log("tableData in tablewithsearch.js :",tableData);
  console.log("typeof(tableData) ",typeof(tableData[0]));
  console.log("tableData[index] in tablewithsearch.js :",tableData[index]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  const filterTableData = () => {
    //console.log("item.customer_id in tablewithsearch.js :",item.customer_id)
    const filtered = tableData.filter((item) =>
      //item.name.toLowerCase().includes(searchQuery.toLowerCase())
      item.customer_id === parseInt(searchQuery)
    );
    //console.log("item.customer_id in tablewithsearch.js :",item.customer_id)
    console.log("filtered ",filtered);
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterTableData();
  }, [searchQuery]);

  return (
    <div>
      <input
      className="search-input"
        type="number"
        placeholder="Search using customer Id..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
              <th>Customer Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.customer_id}>
              <td>{item.customer_id}</td>
              <td>{item.customer_name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              {/* Other table cells */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithSearch;
