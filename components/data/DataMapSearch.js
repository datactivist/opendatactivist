// DataMapSearch.js
import React, { useState } from 'react';
import DataMapTable from './DataMapTable';

const DataMapSearch = () => {
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <DataMapTable search={search} />
    </div>
  );
};

export default DataMapSearch;
