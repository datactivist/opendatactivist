import { Button } from '@mui/material';
import Link from 'next/link';

const DiscourseComments = ({ id }) => {
  return (
    <Link href={`https://teamopendata.org/t/${id}`}>
      <Button variant="contained" sx={{
              mt: '2rem',
              backgroundColor: '#fff',
              borderColor: '#000',
              borderWidth: '0px',
              borderStyle: 'solid',
              borderRadius: '10px',
              color: '#000',
              '&:hover': {
                  backgroundColor: '#E95459',
                  color: '#fff'
              }
          }}>
        💬 En discuter sur #TeamOpenData
      </Button>
    </Link>
  );
};

export default DiscourseComments;
