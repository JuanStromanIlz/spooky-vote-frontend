import { useState, useEffect, useContext } from 'react';
import { User } from 'context/UserContext';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Compressor from 'compressorjs';

const StyledAvatarInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  > * {
    margin: auto;
  }
  margin-bottom: 16px;
  .empty-image {
    box-shadow: 0 0 1px 1px #f44336;
  }
  .error-message {
    color: #f44336;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: center;
    margin-top: 6px;
    margin-right: 14px;
    margin-bottom: 0;
    margin-left: 14px;
  }
`;

export default function FileInput({ form, field, error, clean }) {
  const { openSnack } = useContext(User);
  const [fileSelected, setFileSelected] = useState('false');

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    new Compressor(fileUploaded, {
      quality: 0.6,
      success: (res) => {
        form.setFieldValue(field.name, res);
        setFileSelected(URL.createObjectURL(res));
      },
      error: () => {
        openSnack('open', 'El archivo debe ser una imagen.', 'error');
      }
    });
  };

  useEffect(() => {
    setFileSelected('false');
  }, [clean]);

  return (
    <StyledAvatarInput>
      <input 
        style={{ display: 'none' }}
        id='avatarInput'
        type='file'
        accept='image/*'
        onChange={handleChange}
        capture='user'
      /> 
      <label htmlFor='avatarInput'>
        <Avatar 
          className={error ? 'empty-image' : null}
          src={fileSelected} 
          sx={{ width: 120, height: 120, borderRadius: '4px' }}  
        />
      </label>
      {error ?
        <Typography className='error-message' variant='inherit'>
          {error}
        </Typography>
      : null}
    </StyledAvatarInput>
  );
};