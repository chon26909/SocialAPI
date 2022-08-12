import { Request, Response } from 'express';
import Post from '../models/Post.model';
import { uploadImage } from '../utilities/multer'

export const getPost = async (req: Request, res: Response,) => {
    try {
        let posts = await Post.find()
            .populate({ path: 'author', model: 'users' });

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }
}

export const getPostByUser = async (req: Request, res: Response) => {
    const uid = req.params.uid;
    console.log("uid", uid);
    try {
        let posts = await Post.find({ author: uid })
            .populate({ path: 'author', model: 'users' });

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req: Request, res: Response) => {

    const { text, tags, picture}  = req.body

    try {

        const { secure_url } = await uploadImage(picture);

        const picture_name = secure_url.split('/').pop();
        
        const data = {
            text,
            tags,
            picture_name,
            author: req.session.uid
        }
        await Post.create(data);
        res.status(201).json({ message: 'created', data });
    } catch (error) {
        console.log(error);
    }

}