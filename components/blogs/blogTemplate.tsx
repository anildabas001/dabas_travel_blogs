'use client';
import React, { useState } from "react";
import { dateFormat } from "@/lib/utility";
import { BlogContent } from "@/types";
import { Typography, Box, Card, Button, Stack, Chip } from "@mui/material";
import parse from 'html-react-parser';
import TruncateMarkup from 'react-truncate-markup';
import { CldImage } from 'next-cloudinary';

export function BlogTemplate ({blogContent}: {blogContent:BlogContent}) {
    const publicationDate = dateFormat(blogContent?.publicationdate);
    console.log(blogContent);

    let locations = blogContent.location.split('/');
    
    return (
        <>
            <Card component="div" elevation={0}  sx={{pt: 0, mb: 2, border: '2px solid #1976D2'}}>
                <Box sx={{height: '250px', overflow: 'hidden'}}>
                    <Box sx={{mb: 2}}>
                        <Box sx={{width: '100%', backgroundColor: '#1976D2', p: 1}}>
                            <Typography
                                component="p" 
                                color="#fff" 
                                width="100%"
                                sx={{fontSize: '1.7rem', fontWeight: 'light', pb: 0, mb: 0}}
                            >
                                {blogContent.title} 
                            </Typography>
                        </Box>    
                        <Box sx={{p: 1, pb: 0}}>
                            <Typography
                                component="p" 
                                variant="caption" 
                                color="inherit" 
                                width="100%"
                                sx={{mt: 0, fontSize: '0.8rem'}}
                            >
                                Published On: {publicationDate} by {blogContent.publisheralias}
                            </Typography>
                        </Box> 
                        <Box sx={{p: 1}}>
                            <Stack alignItems="center" direction="row" spacing={1}>
                                {locations.map(location => location ? <Chip label={location} color="primary" /> : null)}
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{p: 1, display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{pr: 2}}>
                            <CldImage
                                alt="image for the blog"
                                src={blogContent?.image|| ''} // Use this sample image or upload your own via the Media Explorer
                                width="150" // Transform the image: auto-crop to square aspect_ratio
                                height="150"
                                crop={{
                                  type: 'auto',
                                  source: true
                                }}
                            />
                        </Box>
                        <Box>
                            <TruncateMarkup
                                lines={4}
                                ellipsis={
                                    <></>
                                }                                 
                            >                     
                                <Box component={"div"}>{parse(blogContent.content)}</Box>                   
                            </TruncateMarkup>
                        </Box>
                    </Box>
                    
                </Box>   
                <Box sx={{p: 1, width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={{p: 0, mt: 1}}>
                        Continue Reading...
                    </Button>
                </Box>
                <Box sx={{p: 0.3, backgroundColor: '#1976D2', width: '100%'}}>
                    <Typography
                        component="span" 
                        variant="caption" 
                        color="#fff" 
                        width="100%"
                        sx={{mt: 0, fontSize: '0.8rem'}}
                    >
                        Likes: 2
                    </Typography>
                    <Typography
                        component="span" 
                        variant="caption" 
                        color="#fff" 
                        width="100%"
                        sx={{mt: 0, fontSize: '0.8rem', pl: 2}}
                    >
                        Comments: 2
                    </Typography>
                </Box>                
            </Card>            
        </>
    );
}