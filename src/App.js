import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from 'components/Theme';
import Home from 'views/Home';
import Vote from 'views/Vote';
import Winners from 'views/Winners';
import NewCharacter from 'views/NewCharacter';
import CssBaseline from '@mui/material/CssBaseline';
import UserContext from 'context/UserContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <UserContext>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/votar' component={Vote} />
              <Route path='/participar' component={NewCharacter} />
              <Route path='/ganadores' component={Winners} />
            </Switch>
        </UserContext>
      </Router>
    </ThemeProvider>
  );
}

export default App;
