import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { register } from 'services/SpookyAPI';
import AvatarInput from 'components/common/AvatarInput';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  actor: Yup.string()
    .required('Actor is required'),
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

export default function RegisterForm() {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          actor: '',
          avatar: []
        }}
        validationSchema={RegisterSchema}
        onSubmit={register}
      >
        {({ errors, values, touched, handleChange }) => (
          <Form>
            <FormGroup>
              <Field name='avatar' component={AvatarInput} error={Boolean(errors.avatar)}/>
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
            <Button size='large' variant='contained' type='submit'>Registrarme</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}