import React from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Navigation = ({ mode, onChange }) => {

  return (
    <Box className='view-navigation' sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        elevation={0}>
        <Box sx={{ display: 'flex', justifyContent: 'end'}}>
          <FormControlLabel
            control={<Switch onChange={ onChange } color='default' sx={{ m: 0 }}/>}
          />
        </Box>
        <Typography
          className='main-header'
          variant='h2'
          component='div'
          sx={{ flexGrow: 1, padding: 0, margin: 'auto', fontWeight: 100}}>
          <div className='main-header'>ATELIER</div>
        </Typography>
        <Divider variant='middle'/>
        <Typography
          className='secondary-header'
          variant='text'
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
