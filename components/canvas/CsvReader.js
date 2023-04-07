import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function CsvReader({ filename }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedRows, setDisplayedRows] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data/${filename}`);
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, [filename]);

  const filteredData = searchTerm
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const visibleData = filteredData.slice(0, displayedRows);

  return (
    <div>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((key, index) => (
                  <TableCell key={index}>{key}</TableCell>
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

export default CsvReader;
