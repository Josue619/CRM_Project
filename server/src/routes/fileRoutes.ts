import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import fileController from '../controllers/fileController';

const router: Router = Router();

router.get('/request/:id', TokenValidation, fileController.getRequest);

export default router;