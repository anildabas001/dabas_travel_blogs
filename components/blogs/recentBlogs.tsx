import { getRecentBlogs } from "@/lib/authDbTransactions";
import { Box, Typography, Divider } from "@mui/material";
import { RecentPartBlog } from "./recentPartBlog";
import { ReactNode } from "react";


export default async function RecentBlogs () {
    const blogs = await getRecentBlogs();
    let blogElements: ReactNode = 
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', height: '30vh', color: 'grey'}}>
        <Typography
            component="h5" 
            variant="h5" 
            color="inherit" 
            textAlign="center"
            width="100%"
            sx={{m: 2}}
        >
            Sorry there are no blogs to Show.
        </Typography>;
    </Box>
    
    if (blogs.length > 0) {
        blogElements = blogs.map(blog => (
            <RecentPartBlog blogContent={{
                id: blog.id, 
                title: blog.title,
                content: blog.content,
                location: blog.location,
                publicationdate: blog.publicationdate,
                publisheralias: blog.publisheralias
            }} />
        ));
    }
    return (
        <Box component={"div"} sx={{borderRight: "1.8px solid rgba(0, 0, 0, 0.12)"}}>
            <Typography
                component="h3" 
                variant="h3" 
                color="inherit" 
                textAlign="center"
                width="100%"
                sx={{mt: 4, mb: 2}}
            >
                Most Recent Blogs
            </Typography>
            <Divider sx={{
                borderColor: 'grey',
                borderWidth: '1px',
                width: '70%',
                margin: '0 auto',
                mb: 8
                }} 
            />
            {
                blogElements
            }
        </Box>
        
    );
}