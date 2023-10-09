import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { deepOrange, teal } from '@mui/material/colors';

export const navBarButton = {
  color: '#f5f5f5',
  textTransform: 'initial',
};
export const pageBody = {
  body: {
    color: 'orange',
    backgroundColor: '#f5f5f5',
    backgroundImage: 'url("/images/opacity2-background2.webp")',
    backgroundRepeat: 'repeat',
    // backgroundSize: 'cover',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#270039',
    color: '#f5f5f5',
    minHeight: '10vh',
  },
};

export const appBarStyle = {
  backgroundColor: '#270039',
  marginBottom: '20px',
  '& a': {
    color: '#f5f5f5',
  },
};

export const NavBarButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 90,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 90,
  },
}));

export const NavBarButtonHover = styled(NavBarButton)({
  '&:hover': {
    '& .MuiImageMarked-root': {
      width: '100%', // Expand the underline on hover
    },
  },
});

export const NavBarMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 0,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: 20,
  left: '50%',
  transition: theme.transitions.create('opacity'),

  transform: 'translateX(-50%)', // Center the underline
  transition: 'width 0.3s ease',
}));

export const CarouselContainer = styled('div')({
  marginTop: '20px',
  backgroundColor: '#ffffff',
});
