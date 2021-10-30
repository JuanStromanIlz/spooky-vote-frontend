import { useContext } from 'react';
import { User } from 'context/UserContext';
import Grid from '@mui/material/Grid';
import LinkButton from 'components/common/LinkButton';

export default function Home() {
  const { vote, register } = useContext(User);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton disabled={register} size='large' variant='contained' to='/participar'>Participar</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <LinkButton disabled={vote} size='large' color='secondary' to='/votar'>Votar</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <LinkButton disabled={vote} size='large' color='secondary' to='/ganadores'>Ganadores</LinkButton>
      </Grid>
    </Grid>
  );
}