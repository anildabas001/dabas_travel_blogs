import BlogPosts from "@/components/blogs/blogPosts";
import SearchField from "@/components/blogs/searchField";
import PageHeading from "@/components/pageHeading";
import {Box, Divider} from "@mui/material";



export default function Blogs () {
    return (
        <Box component={"div"}>
            <PageHeading heading={"Discover Our Travel Stories!!"} />
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}} component={"div"}>
                <SearchField />
            </Box>
            <Divider sx={{width: '60%', m: '25px auto'}} />
            <Box>
                <BlogPosts />
            </Box>
        </Box>
    );
}