'use client'
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import Link from 'next/link';
import LogoBlog from '../logoBlog';
import {signUpAction} from '../../serverActions/actions';
import {type formState, FormType } from '@/types';
import CustomForm from './customForm';
import {useFormState} from 'react-dom';

type muiStyle = {
    sx: SxProps<Theme>;
}

function Copyright(props: muiStyle) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          Dabas Travel Blogs{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const defaultTheme = createTheme();

export default function authorizationForm () {

    const [formToggle, updateFormToggle] = useState<FormType>(FormType.login);

    const changeForm = () => {
        updateFormToggle(prevFormType => prevFormType === FormType.login ? FormType.signUp : FormType.login);
    }

    console.log(formToggle);

    const handleLogin = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();        
    };

    const [state, formAction] = useFormState<formState, FormData>(signUpAction, {message: [], status: ''});

    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LogoBlog sx={{m: 1, height: 150, width: 150, p: 2}} />
              <Typography component="h1" variant="h5">
                {formToggle} Form
              </Typography>
              <CustomForm action={formAction} formType={formToggle} onSubmit={handleLogin}>
                <Box sx={{ mt: 1 }}>
                  { formToggle === FormType.signUp ?
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                    /> : null
                  }
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />                
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {formToggle}
                  </Button>
                  <Grid container>                  
                    <Grid item>
                      <Typography>
                          <Link href="#" onClick={() => {changeForm()}}>
                              <Typography
                                  component={"span"}
                                  sx={{
                                    color: '#000000',
                                    '&:hover': {
                                      color: "#1976d2",
                                    },
                                  }}
                              >
                                  {formToggle === FormType.login ? "Don't have an account? Sign Up." : "Proceed to Login."}
                              </Typography>
                          </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CustomForm>              
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
    );
}