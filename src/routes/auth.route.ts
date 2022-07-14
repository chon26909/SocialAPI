import express,{ Router } from 'express';
import { loginWithEmail, registerWithEmail } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', loginWithEmail);
router.post('/register', registerWithEmail);

export { router as AuthRoute }