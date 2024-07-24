'use client';
import React, {useState, useEffect, useRef, ReactNode} from "react";
import { Alert, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, SelectChangeEvent, Typography, Button } from "@mui/material";
import Fieldset from "@/components/fieldSet";
import { FormField } from "@/types";
import ContentEditor from "./contentEditor";
import AlertModal from "../alertModal";

const headerData = {
    "Authorization": `Bearer ${process.env.GEO_AUTH_TOKEN}`,
    "Accept": "application/json"
}

export default function BlogForm () {
    //form fields
    let [countrySelected, updateCountrySelected] = useState<FormField>({
        value: '',
        error: false,
        errorMessage: ''
    });

    let [stateSelected, updateStateSelected] = useState<FormField>({
        value: '',
        error: false,
        errorMessage: ''
    });

    let [citySelected, updateCitySelected] = useState<FormField>({
        value: '',
        error: false,
        errorMessage: ''
    });


    // using ref to contain current values
    const prevCountrySelected = useRef<string>('');
    const prevStateSelected = useRef<string>('');
    const editorRef = useRef<any>(null);

    //referenced form elements
    let titleElement  = useRef<HTMLInputElement>();
    let publisherAlias  = useRef<HTMLInputElement>();

    //select field options
    let [countries, updateCountries] = useState<string[]>([]);
    let [states, updateStates] = useState<string[]>([]);
    let [cities, updateCities] = useState<string[]>([]);

    //Modal
    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<ReactNode[]>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent, valueToChange: string) => {
        switch (valueToChange) {
            case 'country':
                updateCountrySelected({
                    value: event.target.value,
                    error: false,
                    errorMessage: ''
                });
            case 'state':
                updateStateSelected({
                    value: event.target.value,
                    error: false,
                    errorMessage: ''
                });
            default:
                updateCitySelected({
                    value: event.target.value,
                    error: false,
                    errorMessage: ''
                });
        }       
    }

    function validateForm (title: string, content: string): {isFormValid: boolean; messages: ReactNode[]} {
        let isFormValid: boolean = true;
        let messages: ReactNode[] = [];

        if (title.trim().length === 0) {
            messages.push(<Alert severity="error">Title field cannot be empty.</Alert>);
            isFormValid = false;
        }

        if (content.trim().length === 0) {
            messages.push(<Alert severity="error">Blog content cannot be empty.</Alert>);
            isFormValid = false;
        }

        return {isFormValid, messages};
    }



    function formSubmitHandler (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();

        let title = titleElement.current?.value || '';
        let alias = publisherAlias.current?.value;
        let location = `${countrySelected}/${stateSelected}/${citySelected}`;
        let content = editorRef.current.getContent();

        console.log('content', content);

        const {isFormValid, messages} = validateForm(title, content);
        setMessages(messages);

        if (!isFormValid) {
            handleOpen();
            return
        }
    }

    useEffect (() => {
        async function fetchStateAndCitydata (changedVariable: string) {
            console.log(changedVariable, 'changedVariablechangedVariablechangedVariablechangedVariablechangedVariable');
            let stateApi = `https://www.universal-tutorial.com/api/states/${countrySelected.value}`;
            let cityApi = `https://www.universal-tutorial.com/api/cities/${stateSelected.value}`
            let apiToUse: string;

            if (changedVariable === 'country') {
                apiToUse = stateApi;
            } else {
                apiToUse = cityApi;
            }

            try {
                let response = await fetch (apiToUse,
                    {
                        headers: {
                            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GEO_AUTH_TOKEN}`,
                            "Accept": "application/json",
                        }
                    }
                );
    
                if (! response.ok) {
                    console.log();
                } else {
                    if (changedVariable === 'country') {
                        let states: {
                            "state_name"?: string,
                        }[] = await response.json();
    
                        let list: string[] = states.map(state => state.state_name as string);
                        updateStates(list);
                    } else {
                        let cities: {
                            "city_name"?: string,
                        }[] = await response.json();
    
                        let list: string[] = cities.map(city => city.city_name as string);
                        updateCities(list);
                    }                 
                }     
            } catch (err: any) {
                console.log(err.message);
            }
                   
        }
        if (countrySelected.value != prevCountrySelected.current && countrySelected.value) {
            fetchStateAndCitydata('country');
            updateCitySelected((state) => {
                return {
                    ...state,
                    value: ''
                }
            });
            updateStateSelected((state) => {
                return {
                    ...state,
                    value: ''
                }
            });
            prevCountrySelected.current = countrySelected.value;
        } 
        
        if (stateSelected.value != prevStateSelected.current && stateSelected.value){
            fetchStateAndCitydata('state');
           
            updateCitySelected((state) => {
                return {
                    ...state,
                    value: ''
                }
            });
        } else {
            console.log('ran on Mount')
        }     
        
    }, [countrySelected, stateSelected]);

    useEffect (() => {
        async function fetchCountrydata () {
            let countryList: string[] = [];
            let countriesApi = "https://www.universal-tutorial.com/api/countries";
            try {
                let response = await fetch (countriesApi,
                    {
                        headers: {
                            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GEO_AUTH_TOKEN}`,
                            "Accept": "application/json",
                        }
                    }
                );
    
                if (! response.ok) {
                    console.log();
                } else {
                    let countries: {
                        "country_name"?: string,
                        "country_short_name"?: string,
                        "country_phone_code"?: string
                    }[] = await response.json();
    
                    countryList = countries.map(countryData => countryData.country_name as string);
                    updateCountries(countryList);
                }        
            } catch (error: any) {
                console.log(error.message);
            }
                
        }

        fetchCountrydata();
        
    }, []);

    return (            
            <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
                onSubmit={formSubmitHandler}
            >
                <AlertModal
                    open={open}
                    handleClose={handleClose}
                    title={"Form Errors"}
                    messages={messages}
                />
                <Grid container spacing={4} xs={12}>
                    <Grid item xs={7}>
                        <TextField inputRef={titleElement} fullWidth required id="outlined-basic" label="Blog Title" name="blogTitle" variant="outlined" /> 
                    </Grid>
                    <Grid item xs={5}>
                        <TextField inputRef={publisherAlias} fullWidth id="outlined-basic" label="Publisher Alias" name="publisherAlias" variant="outlined" /> 
                    </Grid>
                    <Grid item container xs={12}>
                        <Fieldset legend="Travel Location">
                            <Grid item spacing={3} container xs={12}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="countrySelectLabel">Country</InputLabel>
                                        <Select
                                            labelId="countrySelectLabel"
                                            id="countrySelect"
                                            name="countrySelected"
                                            value={countrySelected.value}
                                            label="Country"
                                            onChange={(event) => handleChange(event, 'country')}
                                        >
                                            {
                                                countries.map(country => <MenuItem key={country} value={country}>{country}</MenuItem>)
                                            }                                    
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="stateSelectLabel">State</InputLabel>
                                        <Select
                                            labelId="stateSelectLabel"
                                            disabled={countrySelected.value ? false : true}
                                            id="stateSelect"
                                            name="stateSelected"
                                            value={stateSelected.value}
                                            label="State"
                                            onChange={(event) => handleChange(event, 'state')}
                                        >
                                            {
                                                states.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)
                                            }                                    
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="citySelectLabel">City</InputLabel>
                                        <Select
                                            labelId="citySelectLabel"
                                            id="citySelect"
                                            disabled={stateSelected.value ? false : true}
                                            value={citySelected.value}
                                            label="City"
                                            onChange={(event) => handleChange(event, 'city')}
                                        >
                                            {
                                                cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)
                                            }                                    
                                        </Select>
                                    </FormControl>
                                </Grid> 
                            </Grid>
                        </Fieldset>
                        <Grid item xs ={12}>
                            <Typography
                                component="p"
                                sx={{m:0.8, fontWeight: 400}}
                            >
                                Blog Content 
                            </Typography>
                            <ContentEditor editorRef={editorRef}/>
                        </Grid>
                        <Box sx={{width: '100%', m: 3, display: 'flex', justifyContent: 'center'}}>
                            <Button variant="contained" size="large" type="submit">
                                Submit Blog
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                   
            </Box>
    );
}