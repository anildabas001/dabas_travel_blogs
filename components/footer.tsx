import { Typography, SxProps, Theme } from "@mui/material";

type muiStyle = {
    sx: SxProps<Theme>;
}

export default function Footer(props: muiStyle) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          TripTales Blogs{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}