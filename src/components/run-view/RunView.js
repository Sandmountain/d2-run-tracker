import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Autocomplete,
  Box,
} from '@mui/material';

import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import useTimer from '../timer/useTimer.js';
import { formatTime } from '../timer/utils.js';

const data = require('../../data/data.json');

export default function RunView() {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  const [currentRun, setCurrentRun] = useState(1);
  const [totaltTime, setTotalTime] = useState(0);

  const [dialogInput, setDialogInput] = useState('');
  const [dialogItems, setDialogItems] = useState([]);

  const [runHistory, setRunHistory] = useState([]);

  const onNewRun = () => {
    setTotalTime(totaltTime + timer);

    handlePause();
    handleReset();
    handleStart();

    setCurrentRun(currentRun + 1);
  };

  const [openExitDialog, setOpenExitDialog] = useState(false);
  const [openNewRunDialog, setOpenNewRunDialog] = useState(false);

  const handleOpenExitDialog = () => {
    setOpenExitDialog(true);
  };

  const handleCloseExitDialog = () => {
    setOpenExitDialog(false);
  };

  const handleNewRunDialog = () => {
    handlePause();
    setOpenNewRunDialog(true);
  };

  const handleCloseNewRunDialog = () => {
    setOpenNewRunDialog(false);
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    setDialogItems([dialogInput, ...dialogItems]);
  };

  const handleNewRun = () => {};

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" className="diablo-text shadow">
          Mephisto 100
        </Typography>
        <Typography variant="body2" color="gray" style={{ alignSelf: 'self-end' }}>
          Total time: {formatTime(totaltTime)}
        </Typography>
      </div>
      <Paper
        style={{
          width: '50vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 15px',
        }}>
        <ButtonGroup variant="contained" aria-label="">
          {!isActive ? (
            <Button onClick={handleStart}>Start Run</Button>
          ) : (
            <Button onClick={handleNewRunDialog}>Next Run</Button>
          )}

          {isPaused ? (
            <Button onClick={handlePause}>
              <PauseIcon></PauseIcon>
            </Button>
          ) : (
            <Button onClick={handleResume}>
              <PlayArrowIcon></PlayArrowIcon>
            </Button>
          )}
          <Button onClick={handleOpenExitDialog}>
            <ExitToAppIcon></ExitToAppIcon>
          </Button>
        </ButtonGroup>

        <p className="count-text diablo-text">Run {currentRun}</p>
        <Typography variant="body1">{formatTime(timer)}</Typography>
      </Paper>

      <Dialog
        open={openExitDialog}
        onClose={handleCloseExitDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to exit the run?'}</DialogTitle>

        <DialogActions>
          <Button color="primary" onClick={handleCloseExitDialog} autoFocus>
            Go back
          </Button>
          <Button variant="contained" color="primary" onClick={handleCloseExitDialog}>
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewRunDialog} onClose={handleCloseNewRunDialog}>
        <DialogTitle className="diablo-text">FOUND ANYTHING OF INTEREST?</DialogTitle>
        <DialogContent>
          <DialogContentText>Add items down below or continue.</DialogContentText>

          <form onSubmit={handleDialogSubmit} style={{ marginTop: 10 }}>
            <Autocomplete
              multiple
              fullWidth
              size="small"
              options={data}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {console.log(option.type)}
                  <img
                    loading="lazy"
                    width="20"
                    src={require(`../../images/${option.type.replaceAll(' ', '_').toLocaleLowerCase()}_small.png`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '../layout/pngegg.png';
                    }}
                    alt=""
                  />
                  {option.name}
                </Box>
              )}
              renderInput={(params) => <TextField color="secondary" {...params} label="Items" />}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'gray' }} onClick={handleCloseNewRunDialog}>
            Continue
          </Button>
          <Button style={{ color: 'white' }} onClick={handleCloseNewRunDialog}>
            Add items
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
