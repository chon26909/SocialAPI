import { Request, Response } from 'express';
import Post from '../models/Post.model';

export const getPost = async (req: Request, res: Response,) => {
    try {
        let posts = await Post.find()
                                .populate({path: 'author', model: 'users'});

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }
}

export const getPostByUser = async (req: Request, res: Response) => {
    const uid = req.params.uid;
    console.log("uid",uid);
    try {
        let posts = await Post.find({author: uid})
                                .populate({path: 'author', model: 'users'});

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req: Request, res: Response) => {

    const { body } = req;

    const data = {
        ...body,
        author: req.session.uid
    }

    try {
        await Post.create(data);
        res.status(201).json({ message: 'created' });
    } catch (error) {
        console.log(error);
    }

}