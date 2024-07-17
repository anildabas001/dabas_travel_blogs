import { SxProps, Theme } from '@mui/system';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import blogImage from '@/assets/images/blog.png';

type muiStyle = {
    sx: SxProps<Theme>;
}

export default function logoBlog (props: muiStyle) {
    return (
        <Avatar sx={props.sx}>
            <Image priority src={blogImage} alt="blog logo"/>
        </Avatar>
    );
}