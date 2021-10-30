import { useState, useEffect } from 'react';
import { winners } from 'services/SpookyAPI';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardWinner from 'components/common/CardWinner';
import LinkButton from 'components/common/LinkButton';

export default function Winners() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getAllCharacters() {
      let all = await winners();
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
        <Typography gutterBottom variant='h4' component='h2' color='primary'>¡Ganadores!</Typography>
      </Grid>
      {characters.map((person, index) => 
        <Grid key={person._id} item xs={12}>
          <CardWinner item={person} position={index} />
        </Grid>
      )}
    </Grid>
  );
}