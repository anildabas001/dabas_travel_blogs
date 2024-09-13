'use client';
import { CldImage } from "next-cloudinary";

export default function TitleImage ({src}: {src: string}) {
    return (
        <CldImage
            fill
            alt="image for the blog"
            src={src} // Use this sample image or upload your own via the Media Explorer
            // width="500" // Transform the image: auto-crop to square aspect_ratio
            // height="500"
            style={{borderRadius: '1%'}}
            crop={{
              type: 'auto',
              source: true
            }}
        />
    )
}