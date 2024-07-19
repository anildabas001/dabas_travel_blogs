'use client';
import React from "react";
import { 
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Tooltip
 } from "@mui/material"; 
 import Avatar from '@mui/material/Avatar';
 import Link from "next/link";

export default function UserMenu ({settings}:{settings: string[]}) {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
      
        
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
      
        
      
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return(
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> 
                </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </>
    );
}