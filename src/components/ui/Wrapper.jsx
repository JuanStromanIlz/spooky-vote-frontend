import Grid from '@mui/material/Grid';

export default function Wrapper({children}) {
  return (
    <Grid container sx={{padding: '16px'}}>
      {children}
    </Grid>
  );
}