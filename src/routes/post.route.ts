import express,{ Router } from 'express';
import { getPost, createPost } from '../controllers/post.controller';

const router: Router = express.Router();

router.get('/', getPost);
router.post('/', createPost)

export { router as PostRoute }