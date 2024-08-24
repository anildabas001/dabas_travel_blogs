import BlogPosts from "@/components/blogs/blogPosts";
import BlogsMain from "@/components/blogs/blogsMain";
import SearchField from "@/components/blogs/searchField";
import PageHeading from "@/components/pageHeading";
import {Box, Divider} from "@mui/material";



export default function Blogs () {
    return (
        <Box component={"main"}>
            <main>
                <PageHeading heading={"Discover Our Travel Stories!!"} />
                <BlogsMain />
            </main>            
        </Box>
    );
}