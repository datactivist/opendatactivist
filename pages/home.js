import React, { useState } from 'react';
import Layout from '../components/Layout';
import MethodCard from '../components/MethodCard';
import { getAllMethods } from '../lib/markdown';
import { Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function HomePage({ methods }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMethods, setFilteredMethods] = useState(methods);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredMethods(
      methods.filter((method) =>
        method.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
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
        style={{ marginBottom: '1rem' }}
      />
      {/* Ajoutez ici des composants pour les filtres si nécessaire */}
      <Grid container spacing={4}>
        {filteredMethods.map((method) => (
          <Grid item key={method.slug} xs={12} sm={6} md={4}>
            <MethodCard method={method} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const methods = getAllMethods();
  return {
    props: {
      methods,
    },
  };
}
