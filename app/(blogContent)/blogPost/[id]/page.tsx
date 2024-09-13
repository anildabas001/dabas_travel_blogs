import CommentInput from "@/components/commentInput";
import PageHeading from "@/components/pageHeading";
import TitleImage from "@/components/titleImage";
import { getBlogContent } from "@/lib/blogDbTransactions";
import { dateFormat } from "@/lib/utility";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import parse from 'html-react-parser';

export default async function BlogPost ({params}: {params: {id: string}}) {
    const blogContent = await getBlogContent(params.id);
    let locations = blogContent.location.split('/');

    return (
        <Box>
            <PageHeading heading={blogContent.title} />
            <Box sx={{p: 1, pb: 0, textAlign: 'center'}}>
                <Typography
                    component="p" 
                    variant="caption" 
                    color="#6B6B6B" 
                    width="100%"
                    sx={{mt: 0, fontSize: '0.9rem', fontStyle: 'italic'}}
                >
                    Published On: {dateFormat(blogContent.publicationdate)}<br/> by {blogContent.publisheralias ? blogContent.publisheralias : blogContent.name}
                </Typography>
            </Box> 
            <Box sx={{m: 1.5, display: 'flex', justifyContent: 'center', }}>
                <Stack alignItems="center" direction="row" spacing={1}>
                    {locations.map((location: string) => location ? <Chip label={location} color="primary" /> : null)}
                </Stack>
                        </Box>
            <Box sx={{m: '1.6rem auto', position: 'relative', width: '45vw', height: '45vh', borderRadius: '5%'}}>
                <TitleImage src={blogContent?.image_url|| ''} />                
            </Box>
            <Box component={"div"}>{parse(blogContent.content)}</Box> 
            <Box>
                
            </Box>
            <CommentInput />
        </Box>
    );
}