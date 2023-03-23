import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: blue[500],
            '&:hover': {
              backgroundColor: blue[700],
            },
            textDecoration: 'none', // supprime le soulignement
          },
        },
      ],
    },
  },
});

export default theme;
