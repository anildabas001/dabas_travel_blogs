'use client';
import React, {useEffect, useState} from "react";
import { 
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Button
 } from "@mui/material"; 
 import Avatar from '@mui/material/Avatar';
 import Link from "next/link";
 import { signOut } from "next-auth/react";
 import {UserData} from "@/types";
import { getSession } from "next-auth/react";

export default function UserMenu ({settings}:{settings: string[]}) {
    const [isLoggedIn, updateLoginStatus] = useState<boolean>(false);
    const [name, updateName] = useState<string>("");

    useEffect (() => {
        const session = getSession().then( session => {
            if (session?.user) {
                updateLoginStatus(true);
                updateName(session?.user?.name as string);
            }
        });
    }, []);

    let firstNameLetter: string ='';
    
    if (name) {
        firstNameLetter = name[0].toUpperCase();
    } 

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
      
        
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
      
        
      
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);      
    };

    const handleSettingClick = (setting: string) => {
        if (setting?.toLowerCase() === 'logout') {
            signOut();
        }

        setAnchorElUser(null); 
    }

    return(
        <>
            {isLoggedIn ?<> <Tooltip title="Open settings">
                <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>{firstNameLetter}</Avatar>                       
                    </IconButton>                    
                </>                
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
            > <>
                <MenuItem>
                    <Typography textAlign="center">Welcome {name?.charAt(0).toUpperCase() + name?.slice(1)} !</Typography>
                </MenuItem>
                {settings.map((setting) => {
                  return (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )})}
              </>
            </Menu> </>:
                <Link href="/auth?form=login">
                <Button
                  sx={{ my: 2, display: 'block' }}
                >
                    Login
                </Button>
         </Link>}
        </>
    );
}