import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import { Alert, Box, Button, Grid, Link, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { startLoginWithEmailPassword } from "../../store/auth/thunks";
import { Link as RouterLink } from "react-router-dom";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const handleLogin = (event) => {
    const { email, password } = event
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  return (
    <AuthLayout title="Sign In">
      <Box>
        <Formik
          initialValues={ {
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email.'),
            password: Yup.string()
          })}
          onSubmit={ (values, {resetForm}) => {
            handleLogin(values);
            resetForm();
          }}
        >
          { ({handleChange, handleBlur, values, submitForm, errors, touched, isValid, dirty }) => (
            <Form>
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
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid container
                direction='row'
                justifyContent='end'
              >
                <Link component={RouterLink} color='inherit' to='/auth/register'>
                  Create Account
                </Link>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  )
}