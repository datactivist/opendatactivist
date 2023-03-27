import React, { useState } from 'react';
import Layout from '../components/Layout';
import MethodCard from '../components/MethodCard';
import { getAllMethods } from '../lib/markdown';
import { Grid, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function HomePage({ methods }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMethods, setFilteredMethods] = useState(methods);

  const filterMethods = (search) => {
    let filtered = methods;
    if (search !== '') {
      filtered = filtered.filter(
        (method) =>
          method.title.toLowerCase().includes(search.toLowerCase()) ||
          method.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredMethods(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterMethods(event.target.value);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem',
          marginTop: '6rem',
        }}
      >
        <TextField
          label="Recherche"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: '90%', sm: '60%', md: '60%' },
            backgroundColor: 'white',
          }}
        />
      </Box>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '1rem' }}>
        {filteredMethods.map((method) => (
          <Grid item key={method.slug} xs={12} sm={6} md={4} lg={5}>
            <MethodCard method={method} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const methods = getAllMethods().filter((method) => method.index !== 0);
  return {
    props: {
      methods,
    },
  };
}
