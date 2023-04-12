import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function TableAnalysis({ filename, maxRows = 10 }) {
  const [data, setData] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [displayedRows, setDisplayedRows] = useState(maxRows);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data/${filename}`);
      const jsonData = await response.json();
      setData(jsonData);
      setSearchTerms(
        Object.keys(jsonData[0]).reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {})
      );
    };

    fetchData();
  }, [filename]);

  const handleSearchTermChange = (e, key) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[key] = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  const filteredData = data.filter((row) =>
  Object.entries(searchTerms).every(([key, searchTerm]) =>
    (row[key]?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )
);

  const visibleData = filteredData.slice(0, displayedRows);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((key, index) => (
                  <TableCell key={index}>
                    <TextField
                      label={key}
                      value={searchTerms[key]}
                      onChange={(e) => handleSearchTermChange(e, key)}
                      variant="outlined"
                    />
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableAnalysis;
