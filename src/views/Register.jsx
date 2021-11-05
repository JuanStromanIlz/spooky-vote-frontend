import { useContext, useState } from 'react';
import { User } from 'context/UserContext';
import RegisterForm from 'components/RegisterForm';
import Grid from '@mui/material/Grid';
import LinkButton from 'components/ui/LinkButton';
import Wrapper from 'components/ui/Wrapper';
import Typography from '@mui/material/Typography';
import useTime from 'hooks/useTime';

const registerToVote = new Date('October 30, 2021 23:00:00');

export default function Register() {
  const { registerCharacter, register } = useContext(User);
  const [canRegister, distance] = useTime(registerToVote);
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12} sx={{marginBottom: '16px'}}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>Registrate.</Typography>
        <Typography variant='subtitle1' component='h2' color='text.secondary'>Recorda que podes registrate solo una vez.</Typography>
      </Grid>
      {loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canRegister ?
        <Grid item xs={12} sx={{maxWidth: '600px', width: '100%', margin: 'auto', display: 'flex'}}>
          <RegisterForm onSubmit={registerCharacter} register={register} setLoading={setLoading} />
        </Grid>
      :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>En {distance} vas a poder ver registrarte para participar.</Typography>
        </Grid>
      }
    </Wrapper>
  );
}