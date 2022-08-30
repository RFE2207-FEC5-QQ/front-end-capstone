import React from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';

const Navigation = ({ mode, onChange }) => {

  return (
    <div className='nav-bar'>
      {/* <div>God Mode</div>
      <div>Ludicrous Mode</div>
      <div>Psychedelic Mode</div> */}
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
    </div>
  );
};

export default Navigation;
