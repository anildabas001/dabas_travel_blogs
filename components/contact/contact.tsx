'use client';
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import PageHeading from "../pageHeading";
import { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import AlertModal from "../alertModal";
import { validateEmail } from "@/lib/utility";

export default function Contact () {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const message = useRef<HTMLInputElement>(null);

    const [modalOpen, updateModalState] = useState<boolean>(false);
    const [modalMessages, updateModalMessage] = useState<string[]>([]);
    const [errorMessages, updateErrorMessage] = useState<string[]>([]);
    const [loading, updateLoading] = useState<boolean>(false);

    function validateMail (senderName: string, senderEmail: string, senderMessage: string): boolean {
        let isValid = true;
        let messages: string[] = [];

        if (!senderName) {
            messages.push("Please enter the Name.");
            isValid = false;
        }
        if (!senderMessage) {
            messages.push("Please enter your message.");
            isValid = false;
        }
        if (!validateEmail(senderEmail)) {
            messages.push("Please enter the correct email.");
            isValid = false;
        }

        updateErrorMessage(messages);
        return isValid;
    }

    function sendMessage(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        updateLoading(true);
        let senderName: string = name.current?.value || '';
        let senderEmail: string = email.current?.value || '';
        let senderMessage: string = message.current?.value || '';
        if (!validateMail(senderName, senderEmail, senderMessage)) {
            updateLoading(false);
            return;
        }
        const templateParams = {
              from_name: senderName + " (" + senderEmail + ")",
              to_name: "Anil Dabas",
              feedback: senderMessage  
            };
        emailjs
              .send("service_119g0pf", "template_s05yppa", templateParams, "XW_Fzu1IxpcH63wZ0")
              .then(
                function(response) {  
                    updateModalState(true);
                    updateModalMessage(["Message sent successfully."]);               
                },
                function(err) {
                    updateModalState(true);
                    updateModalMessage(["Message delivery failed."]);
                }
              );

        if (name.current) {
            name.current.value = '';
        }
        if (email.current) {
            email.current.value = '';
        }
        if (message.current) {
            message.current.value = '';
        }

        updateLoading(false);
    }
    return(
        <Box component={'form'} onSubmit ={sendMessage} sx={{backgroundColor: '#ebebed', p: 2, borderRadius: 1, m:1, mt: 2, pb: 4}}>
            <PageHeading heading="Contact Us" />
            <AlertModal title={"Contact Us"} messages={modalMessages} open={modalOpen} handleClose={function (): void {
                    updateModalState(false);
                    updateModalMessage([]);
            } } />
            <Grid sx={{mt: 1}} container justifyContent={"cennter"} xs={12} spacing={1}>
                <Grid item xs={12}>
                    <TextField inputRef={name} fullWidth id="name" label="Name" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth inputRef={email} id="email" label="Email" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth inputRef={message} id="message" multiline rows={3} label="Message" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    {
                        errorMessages.map((message, index) =>
                            (<Alert key={index} severity="error" sx={{ mt: 2 }}>
                              {message}
                            </Alert>)
                        )
                    }
                </Grid>
                <Grid item xs={!2} sx={{margin: '6px auto'}}>
                    <Button disabled={loading} sx={{color:"#fff"}} variant="contained" fullWidth type="submit">
                        Submit your Message
                    </Button>
                </Grid>
            </Grid>
        </Box>
        
    ); 
}