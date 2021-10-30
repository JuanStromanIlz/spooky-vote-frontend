import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { vote } from 'services/SpookyAPI';

export default function CardVote({item}) {

  async function voteForThis(id) {
    let res = await vote(id);
    console.log(res);
  }

  return (
    <Card>
      <CardMedia
        component='img'
        image={item.avatar.url}
        alt={item.name}
        style={{aspectRatio: 1}}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='primary' component='div'>
          {item.name}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          {item.actor}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => voteForThis(item._id)} size='large' variant='contained' style={{width: '100%'}}>Votar</Button>
      </CardActions>
    </Card>
  );
}