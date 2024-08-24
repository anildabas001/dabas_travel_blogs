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

export async function getBlogPosts (paginationValue = 0, search: string, searchBy: string) {
    let text = 'SELECT posts.*, users.name from posts JOIN users ON posts.userId = users.id ORDER BY publicationDate DESC LIMIT 5 Offset $1';
    let values: any[] = [paginationValue];

    if (search && searchBy) {
        if (searchBy === 'publisher') {
            text = `
                SELECT posts.*, users.name 
                FROM posts 
                JOIN users ON posts.userId = users.id 
                WHERE LOWER(publisheralias) LIKE CONCAT('%', $1::text, '%') OR
                    LOWER(users.name) LIKE CONCAT('%', $1::text, '%')   
                ORDER BY publicationDate DESC 
                LIMIT 5 OFFSET $2
            `;
        } else {
            text = `
                SELECT posts.*, users.name 
                FROM posts 
                JOIN users ON posts.userId = users.id 
                WHERE LOWER(${searchBy}) LIKE CONCAT('%', $1::text, '%') 
                ORDER BY publicationDate DESC 
                LIMIT 5 OFFSET $2
            `;
        }        
        values = [search.toLowerCase(), paginationValue];
    }

    console.log(text);

    const res = await query(text, values);
    return res.rows;
}

export async function geBlogPostsCount (search: string, searchBy: string) {
    let text = 'SELECT Count(*) from posts';
    let values: any[] = [];
    if (search && searchBy) {
        if (searchBy === 'publisher') {
            text = `
                SELECT COUNT(*)
                FROM posts 
                JOIN users ON posts.userId = users.id 
                WHERE LOWER(publisheralias) LIKE CONCAT('%', $1::text, '%') OR
                    LOWER(users.name) LIKE CONCAT('%', $1::text, '%')   
            `;
        } else {
            text = `
                SELECT COUNT(*) 
                FROM posts 
                JOIN users ON posts.userId = users.id 
                WHERE LOWER(${searchBy}) LIKE CONCAT('%', $1::text, '%') 
            `;
        }     
        
        values = [search.toLowerCase()];
    }

    const res = await query(text, values);
    console.log(res.rows);
    return res.rows[0].count;
}