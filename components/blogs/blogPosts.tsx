 'use client'

import { BlogContent } from "@/types";
import { Box, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { BlogTemplate } from "./blogTemplate";

export default function BlogPosts () {
    let [blogs, updateBlogs] = useState<BlogContent[]>([]);
    let [loading, setLoading] = useState<boolean>(false);
    useEffect(() => 
    {
        async function fetchBlogData () {
            setLoading(true);

            try {
                let response = await fetch('/api/posts');

                if (!response.ok) {
                    throw new Error('No blogs to show');
                }

                let result = await response.json();
                let blogPosts = result.data.posts;
                
                updateBlogs(blogPosts);

            } catch (error: any) {
                console.log(error.message);
            }

            setLoading(false);
            
        }

        fetchBlogData();

    }, []);

    let blogElements =   
        [<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant="h4">
                There are no blogs to show currently
            </Typography>
        </Box>];

    if (blogs.length > 0) {
        blogElements = blogs.map(blog => <BlogTemplate key={blog.id} blogContent={{
            id: blog.id, 
            title: blog.title,
            content: blog.content,
            location: blog.location,
            image: blog.image_url,
            publicationdate: blog.publicationdate,
            publisheralias: blog.publisheralias
        }} />)
    }

    return(
        <>
            {
                loading ? 'Loading...' : blogElements
            }
        </>
    );
}