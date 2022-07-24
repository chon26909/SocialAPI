import express,{ Router } from 'express';
import { getPost, createPost, getPostByUser } from '../controllers/post.controller';
import { vertifyToken } from '../middlewares/vertifyHeader';

const router: Router = express.Router();

router.get('/', getPost);

router.use(vertifyToken);
router.get('/user/:uid', getPostByUser);
router.post('/', createPost)

export { router as PostRoute }