import { SxProps, Theme } from '@mui/system';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import blogImage from '@/assets/images/blog.png';
import Link from 'next/link';

type muiStyle = {
    sx: SxProps<Theme>;
}

export default function LogoBlog (props: muiStyle) {
    return (
        <Link href="/">
            <Avatar sx={props.sx}>
                <Image priority src={blogImage} alt="blog logo"/>
            </Avatar>
        </Link>
        
    );
}