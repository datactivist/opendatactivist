import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function JsonGallery({ filename }) {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/data/${filename}`);
        const jsonData = await response.json();
        setData(jsonData);
      };
  
      fetchData();
    }, [filename]);
  
    const [expanded, setExpanded] = useState({});
  
    const toggleExpand = (index) => {
      setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };
  
    const styles = {
      galleryContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '1rem',
      },
      galleryItem: {
        flexBasis: 'calc(50% - 1rem)',
        margin: '0.5rem',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        },
      },
      title: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: '#173541',
      },
      subtitle: {
        fontSize: '1rem',
        marginBottom: '0.5rem',
        color: '#757575',
      },
      content: {
        fontSize: '0.9rem',
        color: '#424242',
      },
      expandButton: {
        marginTop: '0.5rem',
        color: '#173541',
      },
      searchContainer: {
        margin: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      searchInput: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        width: '20rem',
        marginRight: '1rem',
      },
    };
  
    const filteredData = data.filter((item) => {
      const values = Object.values(item).join('').toLowerCase();
      return values.includes(searchText.toLowerCase());
    });

    return (
        <>
          <div style={styles.searchContainer}>
            <TextField
              label="Rechercher"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: '#173541' }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={styles.galleryContainer}>
            {filteredData.map((item, index) => (
              <div key={index} style={styles.galleryItem}>
                <Card style={styles.card}>
                  <CardContent>
                    {Object.keys(item).map((key, i) => {
                      const content = item[key];
                      const isLongText = content.length > 50;
                      const shouldExpand = expanded[index];
                      const displayText = shouldExpand ? content : content.substring(0, 200) + '...';
                      const buttonText = shouldExpand ? 'Réduire' : 'Déplier';
                      const isUrl = key.toLowerCase().includes('url') || content.includes('http');
                      return (
                        <div key={i}>
                          <Typography style={styles.title}>{key}</Typography>
                          {isUrl ? (
                            <Typography style={styles.content}>
                              <a href={content} target="_blank" rel="noopener noreferrer">
                                {displayText}
                              </a>
                            </Typography>
                          ) : (
                            <Typography style={styles.content}>{displayText}</Typography>
                          )}
                          {isLongText && (
                            <Button
                              variant="text"
                              style={styles.expandButton}
                              onClick={() => toggleExpand(index)}
                            >
                              {buttonText}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </>
      );
}

export default JsonGallery;
