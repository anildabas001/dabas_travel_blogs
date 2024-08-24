import { BlogContent } from "@/types";
import { Box, Typography } from "@mui/material";
import { BlogTemplate } from "./blogTemplate";
import BasicPagination from "../pagination";
import Progress from "../circularProgress";

export default function BlogPosts ({onPageChange, blogs, loading, page, pageCount}: {onPageChange: (event: React.ChangeEvent<unknown>, pageNumber: number) => void, blogs: BlogContent[], loading: boolean, page: number, pageCount: number}) {
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

            {blogs.length > 0 && !loading ? 
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <BasicPagination page={page} pageCount={pageCount} hideNextButton={pageCount <= 1 ? true: false} hidePrevButton={pageCount <= 1 ? true: false} onChange={onPageChange} />
                </Box>: 
            
                null
            }
        </>
    );
}