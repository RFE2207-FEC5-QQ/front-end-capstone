import React from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
// import '../../fonts/ElanRegular.ttf';

const Navigation = () => {

  return (
    <Box className='view-navigation' sx={{ flexGrow: 1 }}>
      <AppBar
        position='sticky'
        elevation={0}
        sx={{backgroundColor: 'white', color: 'black'}}>
        <Typography
          className='main-header'
          variant='h2'
          component='div'
          sx={{ flexGrow: 1, padding: 2, margin: 'auto'}}>
          ATELIER
        </Typography>
        <Divider variant='middle'/>
        <Typography
          variant='h6'
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 1,
          }}>
          <div>PRODUCT DETAIL</div>
          <div>RELATED PRODUCTS</div>
          <div>QUESTIONS</div>
          <div>REVIEWS</div>
        </Typography>
        <Divider variant='middle'/>
      </AppBar>
    </Box>
  );
};

export default Navigation;
