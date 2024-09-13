import { Avatar, Button, Card, IconButton, TextField } from "@mui/material";

export default function CommentInput () {
    return (
        <Card elevation={5} sx={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 auto', p: 2, m: 2, alignItems: 'flex-start'}}>
            <IconButton sx={{ p: 0 }}>
                <Avatar>A</Avatar>                       
            </IconButton>
            <TextField
              sx={{ ml: 1, mr: 1.4 }}
              multiline
              fullWidth
              minRows={4}
              id="outlined-multilined"
              placeholder={"Comment"}
              value={""}            
            />
            <Button
                variant="contained"
                sx={{
                  fontWeight: 500,
                  textTransform: "capitalize",
                  color: "custom.moderateBlue",
                }}
                // startIcon={<img src={replyArrow} alt="reply sign" />}
            >
                Submit
            </Button>
        </Card>
    );
}