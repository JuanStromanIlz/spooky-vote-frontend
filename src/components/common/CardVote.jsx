import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardVote({item, voteAction, canInVote}) {

  return (
    <Card>
      <CardMedia
        component='img'
        image={item.avatar.secure_url}
        alt={item.name}
        sx={{aspectRatio: '1'}}
      />
      <CardContent>
        <Typography gutterBottom variant='h6' color='primary' component='div'>
          {item.name}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          {item.actor}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => voteAction('open', item)} disabled={canInVote} size='small' variant='contained' style={{width: '100%'}}>Votar</Button>
      </CardActions>
    </Card>
  );
}