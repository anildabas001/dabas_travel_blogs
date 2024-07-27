'use client';
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function HeaderLink ({href, children}: {href: string; children: ReactNode}) {
    let path = usePathname(); 
    let button = <Button
                  sx={{ my: 2, display: 'block' }}
                >
                    {children}
                </Button>
    if (path.includes(href)) {
        console.log('here')
        button = <Button
          sx={{ my: 2, display: 'block'}}
        >
            <Typography sx={{borderBottom: '1px solid'}}>{children}</Typography>
        </Button>
    }

    return (
      <Link href={href}>
          {button}
      </Link>
    )  
}