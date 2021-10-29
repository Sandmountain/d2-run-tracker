import React from 'react';

import './mainlayout.css';
import img from './pngegg.png';
import RunCreator from '../run-creator/RunCreator';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import RunView from '../run-view/RunView';
import Button from '@mui/material/Button';

export default function MainLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
              <Avatar alt="Remy Sharp" src={img} style={{ marginRight: '10px' }} />
              <span className="diablo-text shadow">Diablo Runtracker</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container">
        {/* <RunCreator hidden></RunCreator> */}
        <RunView></RunView>
      </div>
    </>
  );
}
