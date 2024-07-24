import BlogForm from "@/components/blogs/blogForm";
import PageHeading from "@/components/pageHeading";
import { Grid } from "@mui/material";

export default function WriteBlog() {
    return (
        <Grid spacing={1} container>
            <Grid item xs={12}>         
                <PageHeading heading="Write your Travel Experience here." />
            </Grid>
            <Grid item xs ={12}>
                <section >
                    <BlogForm />
                </section>
            </Grid>
        </Grid>
        
    );
}