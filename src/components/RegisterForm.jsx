import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AvatarInput from 'components/common/AvatarInput';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre del personaje es obligatorio.'),
  actor: Yup.string()
    .required('Tu nombre es obligatorio.'),
  avatar: Yup.mixed()
  .test((value, {createError}) => {
    if (value.length === 0) {
      return createError({
        path: 'avatar',
        message: 'El avatar es obligatorio.'
      });
    }
    return true;
  })
});

export default function RegisterForm({onSubmit, register, setLoading}) {
  const [formSend, setFormSend] = useState(false);

  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          actor: '',
          avatar: []
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, {resetForm}) => {
          onSubmit(values);
          resetForm();
          setFormSend(true);
          setLoading(true);
        }}
      >
        {({ errors, values, touched, handleChange }) => (
          <Form>
            <FormGroup>
              <Field name='avatar' component={AvatarInput} error={errors.avatar} clean={formSend} />
              <TextField 
                fullWidth
                id="name"
                name="name"
                label="Nombre del personaje"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                variant="filled" 
                placeholder='¿Quien chota sos?' 
                autoComplete="off"
              />
              <TextField 
                fullWidth
                id="actor"
                name="actor"
                label="Tu nombre"
                value={values.actor}
                onChange={handleChange}
                error={touched.actor && Boolean(errors.actor)}
                helperText={touched.actor && errors.actor}
                variant="filled" 
                placeholder='¿Quien chota sos?' 
                autoComplete="off"
              />
            </FormGroup>
              <Button disabled={formSend || register} size='large' variant='contained' type='submit' sx={{marginTop: '16px', width: '100%'}}>Registrarme</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}