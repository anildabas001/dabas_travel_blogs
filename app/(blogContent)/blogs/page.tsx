import BlogPosts from "@/components/blogs/BlogPosts";
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
            <Divider/>
            <Box>
                <BlogPosts />
            </Box>
        </Box>
    );
}