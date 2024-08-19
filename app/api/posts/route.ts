export const dynamic = 'force-dynamic'
import { geBlogPostsCount, getBlogPosts, saveBlogData } from '@/lib/blogDbTransactions';
import { uploadImage } from '@/lib/cloudinaryImageUpload';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

type ResponseData = {status: 'success' | 'fail'; message: string; data?: any}

export async function POST (req: NextRequest) {
    const formData = await req.formData();
    const blogData = Object.fromEntries(formData.entries());
    let postId: number;

    const user = JSON.parse(req.headers.get('x-user') as string);
    blogData.userId = user.sub;


    try {
        const blogHeaderImage = blogData.blogHeaderImage as File;

        if (!blogHeaderImage || !(blogHeaderImage instanceof File)) {
            throw new Error('Invalid file');
        }

        let imageURL = await uploadImage(blogHeaderImage);
        blogData.imageURL = imageURL;
        postId = await saveBlogData(blogData);
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({
            status: 'fail',
            message: 'Blog cannot be published due to error.',
            data: {}
        }, {status: 500});
    }
    
    revalidatePath('/', 'layout');

    return NextResponse.json({
        status: 'success',
        message: '',
        data: {postId: postId}
    });
}


export async function GET (req: NextRequest) {
    let pageNumber = parseInt(req.nextUrl.searchParams.get("page") || '');
    pageNumber = pageNumber ? pageNumber : 1;
    let pageOffset = (pageNumber - 1) * 5;
    let posts: any;
    let totalPosts = 0;
    try {        
        posts = await getBlogPosts(pageOffset);
        totalPosts = await geBlogPostsCount();

    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({
            status: 'fail',
            message: 'Currently no blogs are available.',
            data: {}
        }, {status: 500});
    }
    
    revalidatePath('/', 'layout');

    return NextResponse.json({
        status: 'success',
        message: '',
        data: {posts: posts, totalPosts: totalPosts}
    });
}