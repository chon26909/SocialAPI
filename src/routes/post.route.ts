import express,{ Router } from 'express';
import { getPost, createPost } from '../controllers/post.controller';
import { vertifyToken } from '../middlewares/vertifyHeader';

const router: Router = express.Router();

router.get('/', getPost);

router.use(vertifyToken);
router.post('/', createPost)

export { router as PostRoute }