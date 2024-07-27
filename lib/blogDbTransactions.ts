import {query} from './db';
import { type Status } from "@/types";

export async function saveBlogData(blogData: {
    [k: string]: FormDataEntryValue;
}) {
    const text = 'INSERT INTO posts(title, content, location, publisherAlias, publicationDate, userid) VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
    const values = [blogData.title, blogData.content, blogData.location, blogData.publisherAlias, new Date(), blogData.userId];
     
    const res = await query(text, values);

    return res.rows[0] as number;
}

export async function getRecentBlogs () {
    const text = 'SELECT posts.*, users.name from posts JOIN users ON posts.userId = users.id ORDER BY publicationDate DESC LIMIT 3';

    const res = await query(text);
    console.log('most recent rows', res.rows)
    return res.rows;
}