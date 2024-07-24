import React from "react";
import { 
    Toolbar,
    Typography,
    Box,
    Button
 } from "@mui/material"; 
import LogoBlog from "@/components/logoBlog";
import MobileMenu from "./mobileMenu";
import Link from "next/link";
import UserMenu from "./userMenu";

const pages = ['Blogs', 'Write'];
const settings = ['Profile', 'Change Password', 'Logout'];

export const dynamic = 'force-dynamic';
export const revalidate= 1;

export default async function Header ({title}: {title: string;}){    
          
    return (
        <>
            {/* <AppBar sx={{px: 0, borderBottom: 1, borderColor: 'divider', border: 0}} component="nav" position="static"> */}
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#fff"}}>
                    <LogoBlog sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="span"
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'black',
                          textDecoration: 'none',
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <MobileMenu pages={pages}/>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, }}>
                        <LogoBlog sx={{ display: { xs: 'flex', md: 'none' } }} />
                    </Box>
                    
                    {/* <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="#app-bar-with-responsive-menu"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      {title}
                    </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages.map((page) => (
                        <Link href={`/${page.toLowerCase()}`}>
                            <Button
                                  key={page}
                                //   onClick={handleCloseNavMenu}
                                  sx={{ my: 2, display: 'block' }}
                                >
                                  {page}
                            </Button>
                        </Link>
                        
                      ))}
                    </Box>
                  
                    <Box sx={{ flexGrow: 0 }}>
                        <UserMenu settings={settings} />
                    </Box>
                </Toolbar>
            {/* </AppBar> */}
        </>
    );
}