/**
 * file: config/theme.tsx
 * description: file responsible for configuring the theme of the application
 * data: 11/11/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;
