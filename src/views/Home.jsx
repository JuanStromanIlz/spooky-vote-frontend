import { useContext } from 'react';
import { User } from 'context/UserContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinkButton from 'components/common/LinkButton';
import Typography from '@mui/material/Typography';

export default function Home() {
  const { register } = useContext(User);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <Typography align='center' gutterBottom variant='h4' component='h2' color='primary'>Spooky Fest</Typography>
        <Typography align='center' gutterBottom variant='subtitle1' component='h3' color='text.secondary'>2021</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <LinkButton disabled={register} size='large' variant='contained' to='/participar'>Participar</LinkButton>
          <LinkButton size='large' variant='contained' to='/votar' sx={{marginTop: '16px', marginBottom: '16px'}}>Votar</LinkButton>
          <LinkButton size='large' color='secondary' to='/ganadores'>Ganadores</LinkButton>
        </Box>
      </Grid>
    </Grid>
  );
}