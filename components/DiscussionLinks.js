import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const DiscussionLinks = ({ discourseIds }) => {
    if (!discourseIds || discourseIds.length === 0) {
        return null;
    }
    
    const getTextFromId = (id) => {
        if (!id) return '';
        return String(id).replace(/-/g, ' ');
    };

    return (
        <div style={{ backgroundColor: '##FFF1EB', borderRadius:'10px'}}>
            <Typography variant="h6" fontWeight="bold" align="left" sx={{ mt: '2rem', mb: '1rem', marginLeft: '1rem' }}>
                <hr></hr>
                <br></br>
                En discuter sur TeamOpenData
            </Typography>
            {discourseIds.map((id) => (
                <div key={id} sx={{ mb: '1rem' }}>
                    <Link href={`https://teamopendata.org/t/${id}`} passHref>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#fff',
                                borderColor: '#000',
                                marginBottom: '10px',
                                marginLeft: '1rem',
                                marginRight: '10px',
                                marginTop: '5px',
                                borderWidth: '0.3px',
                                borderStyle: 'solid',
                                borderRadius: '10px',
                                color: '#000',
                                fontWeight: 'regular',
                                fontSize: '0.9rem',
                                textAlign: 'left',
                                '&:hover': {
                                    backgroundColor: '#E95459',
                                    color: '#fff',
                                },
                            }}
                        >
                          💬 {getTextFromId(id)}
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default DiscussionLinks;
