'use client';
import { BlogContent } from "@/types";
import { Grid, Typography, Box, Container, Button } from "@mui/material";
import { Truncate } from '@re-dev/react-truncate';
import parse from 'html-react-parser';

export function RecentPartBlog ({blogContent}: {blogContent:BlogContent}) {
    const publicationDate = blogContent?.publicationdate;

    // Convert the publication date to a Date object
    const date = new Date(publicationDate);

    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
        <>
            <Container component="div" sx={{p: 0, mb: 4}}>
                <Box sx={{mb: 2}}>
                    <Typography
                        component="p" 
                        color="inherit" 
                        width="100%"
                        sx={{mt: 1, fontSize: '1.7rem', fontWeight: 'light', pb: 0, mb: 0}}
                    >
                        {blogContent.title} 
                    </Typography>

                    <Typography
                        component="p" 
                        variant="caption" 
                        color="inherit" 
                        width="100%"
                        sx={{mt: 0, fontSize: '0.8rem'}}
                    >
                        Published On: {formattedDate} by {blogContent.publisheralias}
                    </Typography>
                </Box>
                <Box>
                    <Truncate
                        lines={5}
                        ellipsis={
                            <Button>
                                Continue Reading...
                            </Button>
                        }                       
                    >                     
                        {parse(blogContent.content)}                    
                    </Truncate>
                </Box>
                
            </Container>
            <Box >

            </Box>
        </>
    );
}