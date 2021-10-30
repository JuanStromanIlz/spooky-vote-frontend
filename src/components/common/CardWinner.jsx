import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Medal from 'components/common/Medal';

export default function CardWinner({item, position}) {
  return (
    <Card sx={{position: 'relative', boxShadow: `0 0 3px 1px ${position === 0 ? '#FFD700' : position === 1 ? '#C0C0C0' : '#CD7F32' }`}}>
      <CardMedia
        component='img'
        image={item.avatar.secure_url}
        alt={item.name}
        sx={{aspectRatio: '1'}}
      />
      <Medal position={position} />
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