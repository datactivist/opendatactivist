import React, { useState } from 'react';
import Layout from '../components/Layout';
import UsageCard from '../components/UsageCard';
import { getAllUsages } from '../lib/markdown';
import { Grid, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function UsagesPage({ usages }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsages, setFilteredUsages] = useState(usages);

  const filterUsages = (search) => {
    let filtered = usages;
    if (search !== '') {
      filtered = filtered.filter(
        (usage) =>
          usage.title.toLowerCase().includes(search.toLowerCase()) ||
          usage.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredUsages(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterUsages(event.target.value);
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
        {filteredUsages.map((usage) => (
          <Grid item key={usage.slug} xs={12} sm={6} md={4} lg={5}>
            <UsageCard usage={usage} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const usages = getAllUsages();
  return {
    props: {
      usages,
    },
  };
}
