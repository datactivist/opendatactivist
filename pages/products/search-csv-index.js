import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import Link from 'next/link';
import Layout from '../../components/Layout';

import styles from '../../styles/Search.module.css';

const getSuggestions = async (value) => {
  const response = await fetch(`/api/csv-list`);
  const { files } = await response.json();
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : files.filter(
        (file) => file.toLowerCase().slice(0, inputLength) === inputValue,
      );
};

const Search = () => {
  const [value, setValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const inputProps = {
    placeholder: 'Entrer le titre du CSV...',
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    },
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setValue(suggestionValue);
    setSelectedFile(suggestionValue);
  };

  const clearSelectedFile = () => {
    setValue('');
    setSelectedFile(null);
  };

  return (
    <Layout>
      <div className={styles.title}>
        <h1>Visualiser un CSV</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={async ({ value }) => {
              setSuggestions(await getSuggestions(value));
            }}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(value) => value}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={inputProps}
          />
          <br />
          <div className={styles.selectedFileContainer}>
            {selectedFile && (
              <div className={styles.selectedFile}>
                <span>{selectedFile}</span>
                <button onClick={clearSelectedFile}>x</button>
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <Link href={`/products/search-csv/${selectedFile}`} passHref>
            <button
              className={`${styles.button} ${
                selectedFile ? styles.selected : ''
              }`}
              disabled={!selectedFile}
            >
              Voir dans un tableau filtrable
            </button>
          </Link>
          <br></br>
          <Link href={`/products/json-gallery/${selectedFile}`} passHref>
            <button
              className={`${styles.button} ${
                selectedFile ? styles.selected : ''
              }`}
              disabled={!selectedFile}
            >
              Voir dans une vue gallerie
            </button>
          </Link>
          <br></br>
          <Link href={`/products/empty-csv/${selectedFile}`} passHref>
            <button
              className={`${styles.button} ${
                selectedFile ? styles.selected : ''
              }`}
              disabled={!selectedFile}
            >
              Analyser le taux de remplissage
            </button>
          </Link>
          <br></br>
          <Link href={`/api/data/${selectedFile}`} passHref>
            <button
              className={`${styles.button} ${
                selectedFile ? styles.selected : ''
              }`}
              disabled={!selectedFile}
            >
              Accéder à l&apos;API
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
