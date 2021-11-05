import styled from 'styled-components';
import {Avatar as AvatarM} from '@mui/material';
import Badge from '@mui/material/Badge';

const AvatarContainer = styled.button`
  padding: 0;
  margin: 0;
  background: inherit;
  border: inherit;
  font: inherit;
`;

const SmallAvatar = styled(AvatarM)`
  width: 22px;
  height: 22px;
  border: 2px solid ${props => props.theme.palette.secondary.main};
  background: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.secondary.main};
`;

export default function Avatar({url, onClick, ...props}) {
  return (
    <AvatarContainer onClick={onClick} {...props}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          !url ? 
            <SmallAvatar>+</SmallAvatar>
          : null
        }
      >
        <AvatarM
          src={url ? url : ''} 
          sx={{ width: 120, height: 120, cursor: 'pointer'}}   
        />
      </Badge>
    </AvatarContainer>
  );
}

