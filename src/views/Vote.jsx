import { useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { User } from 'context/UserContext';
import CardVote from 'components/common/CardVote';
import Typography from '@mui/material/Typography';
import Wrapper from 'components/ui/Wrapper';
import LinkButton from 'components/ui/LinkButton';
import useTime from 'hooks/useTime';

const timeToVote = new Date('November 4, 2021 11:05:00');

export default function Vote() {
  const [canVote, distance] = useTime(timeToVote);
  const { characters, getCharacters, openDialog, vote } = useContext(User);

  useEffect(() => {
    if (canVote) {
      getCharacters();
    }
  }, [canVote, getCharacters]);

  return (
    <Wrapper>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>Vota tu disfraz preferido.</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Recorda que podes votar solo una vez.</Typography>
      </Grid>
      {characters.loading ?
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Cargando...</Typography>
        </Grid>
      : canVote ?
        characters.data.length > 0 ?
          <Grid spacing={2} container>
            {characters.data.map(person => 
              <Grid key={person._id} item xs={12} md={6} lg={3}>
                <CardVote item={person} voteAction={openDialog} canInVote={vote} />
              </Grid>
            )}
          </Grid>
        :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Todavia no hay participantes, anotate.</Typography>
        </Grid>
      :
        <Grid item xs={12}>
          <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>En {distance} vas a poder votar.</Typography>
        </Grid>
      }
    </Wrapper>
  );
}