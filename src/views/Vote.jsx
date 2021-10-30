import { useState, useEffect } from 'react';
import { getAll } from 'services/SpookyAPI';
import Grid from '@mui/material/Grid';
import CardVote from 'components/common/CardVote';
import Typography from '@mui/material/Typography';
import LinkButton from 'components/common/LinkButton';

export default function Vote() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getAllCharacters() {
      let all = await getAll();
      setCharacters(all);
    }

    getAllCharacters();
  }, []);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h4' component='h2' color='primary'>Vota tu disfraz preferido.</Typography>
        <Typography gutterBottom variant='subtitle1' component='h2' color='text.secondary'>Recorda que podes votar solo una vez.</Typography>
      </Grid>
      {characters.map(person => 
        <Grid key={person._id} item xs={12}>
          <CardVote item={person} />
        </Grid>
      )}
    </Grid>
  );
}