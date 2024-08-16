 'use client'

import { useEffect, useState } from "react";

export default function BlogPosts () {
    let [blogs, updateBlogs] = useState<[]>();
    useEffect(() => 
    {
        async function fetchBlogData () {
            let response = await fetch('/api/posts');
        }

        fetchBlogData();

    }, []);
    return(
        <>

        </>
    );
}