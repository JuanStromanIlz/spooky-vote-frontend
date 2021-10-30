import RegisterForm from 'components/RegisterForm';
import Grid from '@mui/material/Grid';
import LinkButton from 'components/common/LinkButton';

export default function NewCharacter() {
  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={12}>
        <LinkButton to='/'>Volver</LinkButton>
      </Grid>
      <Grid item xs={12}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
}