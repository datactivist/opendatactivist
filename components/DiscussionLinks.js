import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const DiscussionLinks = ({ discourseIds }) => {
  // Fonction pour extraire le texte à partir de l'identifiant
  const getTextFromId = (id) => {
    if (!id) return '';
    return String(id).replace(/-/g, ' ');
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mt: '2rem', mb: '1rem' }}>
      💬 En discuter sur TeamOpenData
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
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '5px',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#E95459',
                  color: '#fff',
                },
              }}
            >
               {getTextFromId(id)}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DiscussionLinks;
