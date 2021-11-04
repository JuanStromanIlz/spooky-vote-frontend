import { useEffect, useContext } from 'react';
import { User } from 'context/UserContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardWinner from 'components/common/CardWinner';
import LinkButton from 'components/common/LinkButton';
import useTime from 'hooks/useTime';

const seeWinners = new Date('October 31, 2021 01:15:00');

export default function Winners() {
  const { winners, getWinners } = useContext(User);
  const [canSeeWinners, distance] = useTime(seeWinners);

  useEffect(() => {
    if (canSeeWinners) {
      getWinners();
    }
  }, [canSeeWinners, getWinners]);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>¡Ganadores!</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Los + spooky 2021.</Typography>
      </Grid>
      {winners.loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canSeeWinners ?
        winners.data.length > 0 ?
          winners.data.map((person, index) => 
            <Grid key={person._id} item xs={12} md={3}>
              <CardWinner item={person} position={index} />
            </Grid>
          )
        :
          <Grid item xs={12}>
            <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Nadie se anoto :((</Typography>
          </Grid>
      :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>En {distance} vas a poder ver los resultados.</Typography>
        </Grid>
      }
    </Grid>
  );
}