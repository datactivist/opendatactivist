import { Button } from '@mui/material';
import Link from 'next/link';

const DiscourseComments = ({ id }) => {
  return (
    <Link href={`https://teamopendata.org/t/${id}`}>
      <Button
        variant="contained"
        sx={{ mt: '2rem', backgroundColor: '#173541', '&:hover': { backgroundColor: '#E95459' } }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Voir la discussion
      </Button>
    </Link>
  );
};

export default DiscourseComments;
