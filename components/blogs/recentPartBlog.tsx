'use client';
import React, { useState } from "react";
import { dateFormat } from "@/lib/utility";
import { BlogContent } from "@/types";
import { Typography, Box, Card, Button } from "@mui/material";
import parse from 'html-react-parser';
import TruncateMarkup from 'react-truncate-markup';

export function RecentPartBlog ({blogContent}: {blogContent:BlogContent}) {
    const publicationDate = dateFormat(blogContent?.publicationdate);
    
    return (
        <>
            <Card component="div" elevation={0}  sx={{p: 3, mb: 2, border: '2px solid #ebebed'}}>
                <Box sx={{height: '250px', overflow: 'hidden'}}>
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
                            Published On: {publicationDate} by {blogContent.publisheralias}
                        </Typography>
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
                <Box>
                    <Button sx={{p: 0, mt: 2}}>
                        Continue Reading...
                    </Button>
                </Box>
                
            </Card>            
        </>
    );
}