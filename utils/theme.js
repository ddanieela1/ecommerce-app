// import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';

// const theme = createTheme({
//   navbar: {
//     backgroundColor: '#203040',
//     '& a': {
//       color: '#ffffff',
//       marginLeft: 10,
//     },
//   },
//   navbarButton: {
//     color: '#ffffff',
//     textTransform: 'initial',
//   },
//   // toolbar: {
//   //   justifyContent: 'space-between',
//   // },
//   menuButton: {
//     padding: 0,
//   },
//   mt1: {
//     marginTop: '1rem',
//   },
//   // search: {
//   //   display: 'none',
//   //   [theme.breakpoints.up('md')]: {
//   //     display: 'flex',
//   //   },
//   // },
//   logo: {
//     fontWeight: 'bold',
//     fontSize: '1.5rem',
//   },
// });

const styles = {
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  // toolbar: {
  //   justifyContent: 'space-between',
  // },
  menuButton: {
    padding: 0,
  },
  mt1: {
    marginTop: '1rem',
  },
  // search: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
};

export default styles;
