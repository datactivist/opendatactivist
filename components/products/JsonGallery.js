import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import SearchBar from '../nav/SearchBar';
import LinkIcon from '@mui/icons-material/Link';
import Layout from '../Layout';


const JsonGallery = ({ filename }) => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/data/${filename}`);
            const jsonData = await response.json();
            if (Array.isArray(jsonData)) {
                setData(jsonData);
            }
        };


        fetchData();
    }, [filename]);

    const styles = {
        galleryContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'left',
            marginTop: '0.5rem',
            backgroundColor :'rgba(240, 240, 240, 0.5)',
            borderRadius : '10px',
        },
        galleryItem: {
            flexBasis: 'calc(33% - 1rem)',
            margin: '0.5rem',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.02)', // Ajouter cette ligne pour agrandir légèrement la carte au survol
            },
            marginBottom: '1rem',
            cursor: 'pointer', // Ajouter cette ligne pour indiquer que la carte est cliquable
        },
        title: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            marginTop: '0rem',
        },
        firstTitle: {
            color: '#ffffff',
            backgroundColor: '#173541',
            padding: '0.25rem',
            borderRadius: '6px',
        },
        content: {
            fontSize: '0.9rem',
            color: '#424242',
            marginBottom: '1rem',
        },
        dialogTitle: {
            fontWeight: 'bold',
        },
        dialogContent: {
            fontSize: '1rem',
        },
        dialogField: {
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            padding: '0.5rem',
            marginBottom: '1rem',
            marginTop: '1rem',
        },
        dialogBackground: {
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
        },
    };

    const isUrl = (value) => typeof value === 'string' && value.startsWith('http');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCardClick = (cardData) => {
        setSelectedCard(cardData);
    };

    const handleClose = () => {
        setSelectedCard(null);
    };

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const filteredData = data.filter((item) => {
        const values = Object.values(item).join('').toLowerCase();
        return values.includes(searchTerm.toLowerCase());
    });

    return (
        <Layout>
            <div>
                <br></br>
                <br></br>
                <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
            </div>
            <div style={styles.galleryContainer}>
                {filteredData.map((item, index) => (
                    <div key={index} style={styles.galleryItem}>
                        <Card
                            style={
                                index === hoveredCard
                                    ? { ...styles.card, boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', transform: 'scale(1.02)' }
                                    : styles.card
                            }
                            onClick={() => handleCardClick(item)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <CardContent>
                                {Object.entries(item).slice(0, 3).map(([key, content], i) => (
                                    <div key={i}>
                                        <Typography style={i === 0 ? { ...styles.title, ...styles.firstTitle } : styles.title}>
                                            {i === 0 ? content : key}
                                        </Typography>
                                        {i !== 0 && (
                                            isUrl(content) ? (
                                                <Typography style={styles.content}>
                                                    <a href={content} target="_blank" rel="noopener noreferrer">
                                                        <LinkIcon style={{ verticalAlign: 'middle' }} /> Accéder au site
                                                    </a>
                                                </Typography>
                                            ) : (
                                                <Typography style={styles.content}>{content}</Typography>
                                            )
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                ))}
                {selectedCard && (
                    <>
                        {(() => {
                            const [firstFieldKey, firstFieldValue] = Object.entries(selectedCard)[0];
                            return (
                                <Dialog open={!!selectedCard} onClose={handleClose} maxWidth="md" fullWidth>
                                    <DialogTitle style={{ ...styles.dialogTitle, ...styles.firstTitle }}>{firstFieldValue}</DialogTitle>
                                    <DialogContent style={styles.dialogBackground}>
                                        {Object.entries(selectedCard).map(([key, content], i) => (
                                            <div key={i} style={i !== 0 ? styles.dialogField : {}}>
                                                <Typography style={i !== 0 ? styles.dialogTitle : { display: 'none' }}>{key}</Typography>
                                                {i !== 0 && isUrl(content) ? (
                                                    <Typography style={styles.content}>
                                                        <a href={content} target="_blank" rel="noopener noreferrer">
                                                            <LinkIcon style={{ verticalAlign: 'middle' }} /> Accéder au site
                                                        </a>
                                                    </Typography>
                                                ) : (
                                                    i !== 0 && <Typography style={styles.dialogContent}>{content}</Typography>
                                                )}
                                            </div>
                                        ))}
                                    </DialogContent>
                                </Dialog>
                            );
                        })()}
                    </>
                )}
            </div>
        </Layout>
    );
}

export default JsonGallery;