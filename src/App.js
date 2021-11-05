import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { theme } from 'components/Theme';
import Home from 'views/Home';
import Vote from 'views/Vote';
import Winners from 'views/Winners';
import Register from 'views/Register';
import CssBaseline from '@mui/material/CssBaseline';
import UserContext from 'context/UserContext';

function App() {
  return (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <UserContext>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/votar' component={Vote} />
                <Route path='/participar' component={Register} />
                <Route path='/ganadores' component={Winners} />
              </Switch>
          </UserContext>
        </Router>
      </ThemeProvider>
    </MUIThemeProvider>
  );
}

export default App;
