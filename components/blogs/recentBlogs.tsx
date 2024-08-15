import { getRecentBlogs } from "@/lib/blogDbTransactions";
import { Box, Typography, Divider } from "@mui/material";
import { RecentPartBlog } from "./recentPartBlog";
import { ReactNode } from "react";
import PageHeading from "../pageHeading";


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
            <RecentPartBlog key={blog.id} blogContent={{
                id: blog.id, 
                title: blog.title,
                content: blog.content,
                location: blog.location,
                image: blog.image_url,
                publicationdate: blog.publicationdate,
                publisheralias: blog.publisheralias ? blog.publisheralias : blog.name
            }} />
        ));
    }
    return (
        <Box component={"div"} sx={{paddingRight: 1}}>
            {/* <Typography
                component="h3" 
                variant="h3" 
                color="inherit" 
                textAlign="center"
                width="100%"
                sx={{mt: 4, mb: 2}}
            > */}
                <PageHeading heading="Most Recent Blogs"></PageHeading>
            {/* </Typography> */}
            <Divider sx={{
                borderColor: 'grey',
                borderWidth: '0px',
                width: '30%',
                margin: '0 auto',
                mb: 4
                }} 
            />
            {
                blogElements
            }
        </Box>
        
    );
}