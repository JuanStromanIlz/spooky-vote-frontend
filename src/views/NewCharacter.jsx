import { useContext, useState, useEffect } from 'react';
import { isAfter, formatDistanceStrict } from 'date-fns';
import * as esLocale from 'date-fns/locale/es/index.js';
import { User } from 'context/UserContext';
import RegisterForm from 'components/RegisterForm';
import Grid from '@mui/material/Grid';
import LinkButton from 'components/common/LinkButton';
import Typography from '@mui/material/Typography';

export default function NewCharacter() {
  const { registerCharacter, register } = useContext(User);
  const [loading, setLoading] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {

    const registerToVote = new Date('October 30, 2021 23:00:00');
    let clock = setInterval(() => {
      setCanRegister(isAfter(new Date(), registerToVote));
      setDistance(formatDistanceStrict(new Date(), registerToVote, {includeSeconds: true, locale: esLocale}));
    }, 1000);
    if (canRegister) {
      clearInterval(clock);
    }
  }, [canRegister]);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>Registrate.</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Recorda que podes registrate solo una vez.</Typography>
      </Grid>
      {loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canRegister ?
        <Grid item xs={12}>
          <RegisterForm onSubmit={registerCharacter} register={register} setLoading={setLoading} />
        </Grid>
      :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>En {distance} vas a poder ver registrarte para participar.</Typography>
        </Grid>
      }
    </Grid>
  );
}