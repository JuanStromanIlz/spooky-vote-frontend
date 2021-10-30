import { useState, useEffect, useContext } from 'react';
import { isAfter, formatDistanceStrict } from 'date-fns';
import * as esLocale from 'date-fns/locale/es/index.js';
import Grid from '@mui/material/Grid';
import { User } from 'context/UserContext';
import CardVote from 'components/common/CardVote';
import Typography from '@mui/material/Typography';
import LinkButton from 'components/common/LinkButton';

export default function Vote() {
  const [canVote, setCanVote] = useState(false);
  const [loading, setLoading] = useState(true);
  const { characters, openDialog, vote } = useContext(User);
  const [participantes, setParticipantes] = useState([]);
  const [distance, setDistance] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {

    async function getAllCharacters() {
      let all = await characters();
      if (all.length === 0) {
        return;
      }
      setParticipantes(all);
      setDataLoaded(true);
    }

    if (!dataLoaded) {
      getAllCharacters();
    }

    const timeToVote = new Date('October 31, 2021 01:00:00');
    let clock = setInterval(() => {
      setCanVote(isAfter(new Date(), timeToVote));
      setDistance(formatDistanceStrict(new Date(), timeToVote, {includeSeconds: true, locale: esLocale}));
    }, 1000);
    if (canVote) {
      clearInterval(clock);
    }

    return () => {
      setLoading(false);
    }
  }, [participantes, dataLoaded, characters, canVote]);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>Vota tu disfraz preferido.</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Recorda que podes votar solo una vez.</Typography>
      </Grid>
      {loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canVote ?
        participantes.length > 0 ?
          participantes.map(person => 
            <Grid key={person._id} item xs={12}>
              <CardVote item={person} voteAction={openDialog} canInVote={vote} />
            </Grid>
          )
        :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Todavia no hay participantes, anotate.</Typography>
        </Grid>
      :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>En {distance} vas a poder votar.</Typography>
        </Grid>
      }
    </Grid>
  );
}