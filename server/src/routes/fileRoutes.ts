import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import fileController from '../controllers/fileController';

const router: Router = Router();

router.get('/requests/:id', TokenValidation, fileController.getRequests);
router.get('/request/:id', TokenValidation, fileController.getRequest);
router.put('/request/:id', TokenValidation, fileController.updateRequest);

export default router;