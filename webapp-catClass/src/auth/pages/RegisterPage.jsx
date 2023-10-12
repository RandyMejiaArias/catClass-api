import { Form, Formik } from "formik";
import { AuthLayout } from "../layout/AuthLayout"
import { Alert, Box, Button, Grid, Link, TextField } from "@mui/material";
import * as Yup from 'yup';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const handleSignUp = (event) => {
    const { username, email, password } = event;
    dispatch(startCreatingUserWithEmailPassword({username, email, password}));
  }
  return (
    <AuthLayout title='Register'>
      <Box>
        <Formik
          initialValues={ {
            email: '',
            password: '',
            username: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email.'),
            password: Yup.string(),
            username: Yup.string()
          })}
          onSubmit={ (values, {resetForm}) => {
            handleSignUp(values)
            resetForm();
          }}
        >
          { ({handleChange, handleBlur, values, submitForm, errors, touched, isValid, dirty }) => (
            <Form>
              <Grid item xs={12} sx={{ mt:2 }}>
                <TextField 
                  fullWidth
                  name="username"
                  value={values.username}
                  label='Username*'
                  onChange={handleChange}
                  type="text"
                  placeholder="Your username"
                  onBlur={handleBlur}
                  error={touched.username && errors.username}
                  helperText={touched.username && errors.username}
                ></TextField>
              </Grid>

              <Grid item xs={12} sx={{ mt:2 }}>
                <TextField 
                  fullWidth
                  name="email"
                  value={values.email}
                  label='Email*'
                  onChange={handleChange}
                  type="text"
                  placeholder="yourname@mail.com"
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                ></TextField>
              </Grid>

              <Grid item xs={12} sx={{ mt:2 }}>
                <TextField 
                  fullWidth
                  name="password"
                  value={values.password}
                  label='password*'
                  onChange={handleChange}
                  type="password"
                  placeholder="Your Password"
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                ></TextField>
              </Grid>

              <Grid container display={ !!errorMessage ? '': 'none'} sx={{ mt: 1}}>
                <Grid item xs={ 12 }>
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>
              </Grid>

              <Grid container
                spacing={2}
                sx={{ mb:2, mt:1 }}
              >
                <Grid item xs={ 12 }>
                  <Button 
                    variant='contained' 
                    fullWidth 
                    onClick={ submitForm }
                    disabled={ isAuthenticating }
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Grid container
                direction='row'
                justifyContent='end'
              >
                Already have an account?
                <Link component={RouterLink} color='inherit' to='/auth/login'>
                  Login
                </Link>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  )
}