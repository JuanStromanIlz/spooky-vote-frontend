import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function LinkButton({to, children, ...props}) {
  return (
    <Link to={to} style={{display: 'contents', font: 'inherit', color: 'inherit', textDecoration: 'none'}}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}