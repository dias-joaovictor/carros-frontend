import { useRoutes } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import loggedInRoutes from './routes/loggedInRoutes';
import loginRoutes from './routes/loginRoutes';
import { useAuth } from './contexts/AuthContext';

function App() {

  const { authenticated } = useAuth();

  const routes = authenticated ? loggedInRoutes : loginRoutes;
  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
