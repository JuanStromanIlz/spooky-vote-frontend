import { useState, useEffect, useContext } from 'react';
import { User } from 'context/UserContext';
import * as esLocale from 'date-fns/locale/es/index.js';
import { isAfter, formatDistanceStrict } from 'date-fns';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardWinner from 'components/common/CardWinner';
import LinkButton from 'components/common/LinkButton';

export default function Winners() {
  const { winners } = useContext(User);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canSeeWinners, setCanSeeWinners] = useState(false);
  const [distance, setDistance] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {

    async function getAllCharacters() {
      let all = await winners();
      setCharacters(all);
      setDataLoaded(true);
    }

    if (!dataLoaded) {
      getAllCharacters();
    }

    const seeWinners = new Date('October 31, 2021 01:15:00');
    let clock = setInterval(() => {
      setCanSeeWinners(isAfter(new Date(), seeWinners));
      setDistance(formatDistanceStrict(new Date(), seeWinners, {includeSeconds: true, locale: esLocale}));
    }, 1000);
    if (canSeeWinners) {
      clearInterval(clock);
    }

    return () => {
      setLoading(false);
    }
  }, [characters, dataLoaded, winners, canSeeWinners]);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>¡Ganadores!</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Los + spooky 2021.</Typography>
      </Grid>
      {loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canSeeWinners ?
        characters.length > 0 ?
          characters.map((person, index) => 
            <Grid key={person._id} item xs={12}>
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