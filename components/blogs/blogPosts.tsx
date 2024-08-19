 'use client'

import { BlogContent } from "@/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BlogTemplate } from "./blogTemplate";
import BasicPagination from "../pagination";
import Progress from "../circularProgress";

export default function BlogPosts () {
    let [blogs, updateBlogs] = useState<BlogContent[]>([]);
    let [pageCount, updatePageCount] = useState<number>(1);
    let [loading, setLoading] = useState<boolean>(false);
    let [page, updatePage] = useState<number>(1);

    function onPageChange (event: React.ChangeEvent<unknown>, pageNumber: number) {
        updatePage(pageNumber);
    }

    useEffect(() => 
    {
        async function fetchBlogData () {
            setLoading(true);

            try {
                let response = await fetch(`/api/posts?page=${page}`);

                if (!response.ok) {
                    throw new Error('No blogs to show');
                }

                let result = await response.json();
                let blogPosts = result.data.posts;
                let totalPosts = parseInt(result.data.totalPosts);

                if (totalPosts <= 5) {
                    pageCount = 1;
                } else {
                    pageCount = Math.ceil(totalPosts / 5) ;
                }
                
                updateBlogs(blogPosts);
                updatePageCount(pageCount);

            } catch (error: any) {
                console.log(error.message);
            }

            setLoading(false);            
        }

        fetchBlogData();

    }, [page]);

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
        }} />);
    }

    return(
        <>
            {
                loading ? <Progress/> : 
                
                <Box>
                    {blogElements}                     
                </Box>
            }

            {blogs.length > 0 ? 
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <BasicPagination page={page} pageCount={pageCount} hideNextButton={pageCount <= 1 ? true: false} hidePrevButton={pageCount <= 1 ? true: false} onChange={onPageChange} />
                </Box>: 
            
                null
            }
        </>
    );
}