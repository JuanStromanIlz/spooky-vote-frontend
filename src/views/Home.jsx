import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'context/UserContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Wrapper from 'components/ui/Wrapper';
import Avatar from 'components/ui/Avatar';
import LinkButton from 'components/ui/LinkButton';
import Typography from '@mui/material/Typography';

export default function Home() {
  const { user } = useContext(User);

  let history = useHistory();

  function registrarse(user) {
    if (!user) {
      history.push('/participar');
    }
  }

  return (
    <Wrapper>
      <Grid item xs={12} sx={{minHeight: 'calc(100vh - 32px)', display: 'flex'}}>
        <Box sx={{margin: 'auto'}}>
          <Typography align='center' variant='h2' component='h2' color='primary'>Spooky Fest</Typography>
          <Typography sx={{marginBottom: '16px'}} align='center' variant='subtitle1' component='h3' color='text.secondary'>Votemos los mejores disfraces del 2021.</Typography>
          <Box sx={{maxWidth: '600px', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <Avatar onClick={()=> registrarse(user)} url={user ? user.avatar.secure_url : ''} />
            <Box sx={{display: 'flex', flexDirection: 'row', margin: '0 auto', gap: '8px'}}>
              <LinkButton size='large' variant='contained' to='/votar' sx={{width: '50%'}}>Votar</LinkButton>
              <LinkButton size='large' variant='contained' color='secondary' to='/ganadores' sx={{width: '50%'}}>Ganadores</LinkButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Wrapper>
  );
}