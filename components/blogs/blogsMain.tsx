'use client';

import { Box, Divider } from "@mui/material";
import SearchField from "./searchField";
import BlogPosts from "./blogPosts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BlogContent, searchByType } from "@/types";

export default function BlogsMain () {
    //handling search part of the code
    const [searchBy, updatesearchBy] = useState<searchByType>(searchByType.Location);
    const searchField = useRef<HTMLInputElement>(null);

    function handleSearchByChange (evnt: ChangeEvent<HTMLInputElement>, value: string) {
      updatesearchBy(value as searchByType);
    }

    function initiateSearch() {
        let search = searchField.current?.value;
        fetchBlogData(search, searchBy);
    }

    //handling blogs function

    let [blogs, updateBlogs] = useState<BlogContent[]>([]);
    let [pageCount, updatePageCount] = useState<number>(1);
    let [loading, setLoading] = useState<boolean>(false);
    let [page, updatePage] = useState<number>(1);

    function onPageChange (event: React.ChangeEvent<unknown>, pageNumber: number) {
        updatePage(pageNumber);
    }

    async function fetchBlogData (search?: string, searchBy?: searchByType) {
        setLoading(true);

        let endpoint = `/api/posts?page=${page}`;

        if (search && searchBy) {
            endpoint = `/api/posts?page=${page}&search=${search}&searchBy=${searchBy}`;
        }

        try {
            let response = await fetch(endpoint);

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

    useEffect(() => {     
        let search = searchField.current?.value;
        fetchBlogData(search, searchBy);
    }, [page]);

    return (
        <>        
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}} component={"section"}>
                <SearchField searchField={searchField} initiateSearch={initiateSearch} handleSearchByChange={handleSearchByChange} searchBy={searchBy} />
            </Box>
            <Divider sx={{width: '60%', m: '25px auto'}} />
            <Box component={"section"}>
                <BlogPosts onPageChange={onPageChange}  blogs={blogs} loading={loading} page={page} pageCount={pageCount} />
            </Box>
        </>
    );
}