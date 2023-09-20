import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
  {
    url: '/public/images/bluepen.jpeg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/public/images/bluepen.jpeg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/public/images/bluepen.jpeg',
    title: 'Camera',
    width: '30%',
  },
];

const NavBarButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 90,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 90,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '3px dashed #a3dcbc',
    },
  },
}));


.button {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #333;
  transition: border-width 0.3s ease-in-out;
}

.button:hover {
  border-width: 4px; /* Increase the border width on hover */
}


const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 10,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}
    >
      {/* {images.map((image) => ( */}
      <NavBarButton
        focusRipple
        style={{
          width: 100,
        }}
      >
        {/* <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image> */}
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={{
            position: 'relative',
            p: 2,
            pt: 1,
            pb: (theme) => `calc(${theme.spacing(1)} + 2px)`,
          }}
        >
          title
          {/* <ImageMarked className="MuiImageMarked-root" /> */}
        </Typography>
        {/* </Image> */}
      </NavBarButton>
      {/* ))} */}
    </Box>
  );
}
