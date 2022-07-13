import { Request, Response } from 'express';
import Post from '../models/Post.model';

export const getPost = async (req: Request, res: Response,) => {

    try {
        const posts = await Post.find();
        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }

}

export const createPost = async (req: Request, res: Response) => {

    console.log('create post');
    const { body } = req;

    try {
        await Post.create(body);
        res.status(201).json({ message: 'created' });
    } catch (error) {
        console.log(error);
    }

}