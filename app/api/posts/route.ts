export const dynamic = 'force-dynamic'
import { saveBlogData } from '@/lib/blogDbTransactions';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

type ResponseData = {status: 'success' | 'fail'; message: string; data?: any}

export async function POST (req: NextRequest) {
    const formData = await req.formData();
    const blogData = Object.fromEntries(formData.entries());
    console.log(blogData.title);
    let postId: number;

    const user = JSON.parse(req.headers.get('x-user') as string);
    blogData.userId = user.sub;


    try {
        postId = await saveBlogData(blogData);
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({
            status: 'fail',
            message: 'Blog cannot be published due to error on server.',
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