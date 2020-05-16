import { Router } from 'express';

import { TokenValidation } from '../libs/verifyToken';
import authController from '../controllers/authController';

const router: Router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);


router.get('/profile', TokenValidation, authController.profile);

export default router;