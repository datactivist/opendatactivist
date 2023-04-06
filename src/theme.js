import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        },
        paragraph: {
          fontSize: '16px',
          fontFamily: 'Open Sans, sans-serif',
        },
        h1: {
          fontSize: '4rem',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '3rem',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'bold',
        },
        h3: {
          fontSize: '2rem',
          fontFamily: 'Montserrat, sans-serif',
        },
        h4: {
          fontSize: '1.5rem',
          fontFamily: 'Montserrat, sans-serif',
        },
        h5: {
          fontSize: '1rem',
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          // Ajoutez les styles pour les éléments Box ici
          backgroundColor: '#f5f5f5', // Par exemple, définir la couleur d'arrière-plan
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
  },
});

export default theme;
