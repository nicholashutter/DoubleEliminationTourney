'use client';
import * as React from 'react';
import { createTheme} from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

const theme = createTheme({
  palette: 
  {
    primary: 
    {
      main:green[600]
    },
    secondary:
    {
      main:green[500]
    },
    error:
    {
      main:red[900]
    }
  }
});

export default theme;
