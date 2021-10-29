import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import MainLayout from './components/layout/MainLayout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7D0B0D',
    },
    secondary: {
      main: '#fbce50',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout className="app"></MainLayout>
    </ThemeProvider>
  );
}

export default App;
