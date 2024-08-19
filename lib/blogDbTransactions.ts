import {query} from './db';
import { type Status } from "@/types";

export async function saveBlogData(blogData: {
    [k: string]: FormDataEntryValue;
}) {
    const text = 'INSERT INTO posts(title, content, location, publisherAlias, publicationDate, userid, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    const values = [blogData.title, blogData.content, blogData.location, blogData.publisherAlias, new Date(), blogData.userId, blogData.imageURL];
     
    const res = await query(text, values);

    return res.rows[0] as number;
}

export async function getRecentBlogs () {
    const text = 'SELECT posts.*, users.name from posts JOIN users ON posts.userId = users.id ORDER BY publicationDate DESC LIMIT 3';

    const res = await query(text);
    console.log('most recent rows', res.rows)
    return res.rows;
} 

export async function getBlogPosts (paginationValue = 0) {
    const text = 'SELECT posts.*, users.name from posts JOIN users ON posts.userId = users.id ORDER BY publicationDate DESC LIMIT 5 Offset $1';
    let values = [paginationValue]
    const res = await query(text, values);
    return res.rows;
}

export async function geBlogPostsCount () {
    const text = 'SELECT Count(*) from posts';
    const res = await query(text);
    console.log(res.rows);
    return res.rows[0].count;
}