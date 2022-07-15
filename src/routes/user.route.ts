import express,{ Router } from 'express';
import { getProfile } from '../controllers/user.controller';
import { vertifyToken } from '../middlewares/vertifyHeader';

const router: Router = express.Router();

router.use(vertifyToken);
router.get('/me', getProfile);

export { router as userRoute }