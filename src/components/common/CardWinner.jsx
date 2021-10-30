import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardWinner({item, position}) {
  return (
    <Card>
      <CardMedia
        component='img'
        image={item.avatar.url}
        alt={item.name}
        style={{aspectRatio: 1, position: 'relative'}}
      />
      <div>{position}</div>
      <CardContent>
        <Typography variant='h5' color='primary' component='div'>
          {item.name}
        </Typography>
        <Typography gutterBottom variant='overline' color='text.secondary'>
          Votos: {item.votes}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          {item.actor}
        </Typography>
      </CardContent>
    </Card>
  );
}