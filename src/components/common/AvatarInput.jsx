import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

export default function FileInput({ form, field, error }) {
  const [fileSelected, setFileSelected] = useState('false');

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      form.setFieldValue(field.name, fileUploaded);
      setFileSelected(URL.createObjectURL(fileUploaded));
    } else {
      form.setFieldValue(field.name, []);
    }
  };
  return (
    <div>
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
          src={fileSelected} 
          sx={{ width: 120, height: 120 }}  
        />
      </label>
    </div>
  );
};