'use client'
import React, {ReactNode, useState, useEffect, useRef} from 'react';
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
import SubmitButton from './SubmitButton';
import { Alert } from '@mui/material';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import { validateEmail } from '@/lib/utility';
import { signIn } from 'next-auth/react';

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

export default function AuthorizationForm () {
    let loginEmail = useRef<HTMLInputElement>(null);
    let loginPassword = useRef<HTMLInputElement>(null);

    let helperText: ReactNode;

    const router = useRouter();
    const searchParams = useSearchParams();
    let formParam = searchParams.get("form");
    const currentPath = usePathname();

    const [formToggle, updateFormToggle] = useState<FormType>(FormType.login);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const [loading, updateLoading] = useState<boolean>(false);

    useEffect(() => {
        if (formParam === FormType.signUp) {
            updateFormToggle(FormType.signUp);
        } else {
            updateFormToggle(FormType.login);
        }
    }, []);
    
    const changeForm = () => {
        const newFormType = formToggle === FormType.login ? FormType.signUp : FormType.login;
        const newUrl = `${currentPath}?form=${newFormType}`;
        window.location.href = newUrl;

        /*below is the router refresh code that didn't work as there is no way to change/reset the state of useFormState, currently i am forcefully
        reloading the page/*

        /* One way is to declare separate routes for login and signup page */

        /* Other way is to update the error state/respective state(useState) using useEffect with change in useFormState 
        there we can reset the form using useref and remove errors on toggle.*/

        // router.push(`${currentPath}?form=${formToggle=== FormType.login ? FormType.signUp : FormType.login}`);
        // router.refresh();
        // router.replace(currentPath + `?form=${formToggle=== FormType.login ? FormType.signUp : FormType.login}`);
        // updateFormToggle(prevFormType => prevFormType === FormType.login ? FormType.signUp : FormType.login);

        // const newFormType = formToggle === FormType.login ? FormType.signUp : FormType.login;
        // const newUrl = `${currentPath}?form=${newFormType}`;
        // router.replace(newUrl);
        // router.refresh();
        // Force a reload
        // setTimeout(() => {
        //   router.replace(newUrl);
        // }, 100);

    }

    function validateLogin(email: string | undefined, password: string |undefined): boolean {
        let formValid = true;
        let message: string[] = [];

        if (!email || !password) {
            message.push('Please completely fill the Login form.');
            formValid = false;
        } else {
            if (!validateEmail(email)) {
                formValid = false;
                message.push('Please enter the valid email address.');
            }
            if (password.length < 6) {
                formValid = false;
                message.push('Password must be at least 6 characters long.')
            }
        }

        setErrorStatus(!formValid);
        setErrorMessage(message);

        return formValid;
    }

    const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();   
        updateLoading(true);

        let errorStatus = false;
        let errorMessage: string[] = [];
        //get form fields
        const email = loginEmail.current?.value;
        const password = loginPassword.current?.value;

        //validate the login form fields
        const validateResult = validateLogin(email, password);

        //if valid, prepare formData and send the fetch request
        if (!validateResult) {return;}

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            updateLoading(false);
            errorStatus = true;
            errorMessage.push(result.error);
        } else {
            setErrorStatus(errorStatus);
            setErrorMessage(errorMessage);
            // Redirect to a different page or perform other actions
            router.push('/');
        }

        setErrorStatus(errorStatus);
        setErrorMessage(errorMessage);
    };

    const [formDataState, formAction] = useFormState<formState, FormData>(signUpAction, {message: [], status: ''});
    
    //setting error alert on the form based on form type
    if (formToggle === FormType.signUp) {
        if (formDataState.status === 'fail') {
            helperText = formDataState.message.map((message, index) =>
                (<Alert key={index} severity="error" sx={{ mt: 2 }}>
                  {message}
                </Alert>)
            )        
        } else if (formDataState.status === 'success') {
            helperText =
                (<Alert severity="success" sx={{ mt: 2 }}>
                  {"User Registered Successfully."}
                </Alert>)
        } 
    }else {
        if (errorStatus) {
            helperText = errorMessage.map((message, index) =>
                (<Alert key={index} severity="error" sx={{ mt: 2 }}>
                  {message}
                </Alert>)
            )  
        }
    }
    

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
                    inputRef={loginEmail}
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
                    inputRef={loginPassword}
                  />            
                  {helperText}
                  <SubmitButton formType={formToggle} disabled={loading}>
                    {formToggle}
                  </SubmitButton>
                  <Grid container>                  
                    <Grid item>
                      <Typography>
                          <Link href='#' onClick={() => {changeForm()}}>
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