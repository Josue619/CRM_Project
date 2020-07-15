import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import fileController from '../controllers/fileController';

const router: Router = Router();
/** ------------------------------ Request ------------------------------------ */
router.get('/requests/:id', TokenValidation, fileController.getRequests);
router.get('/request/:id', TokenValidation, fileController.getRequest);
router.put('/requests/:id', TokenValidation, fileController.updateRequest);
router.put('/request/:id', TokenValidation, fileController.deleteRequest);
router.post('/serarch', TokenValidation, fileController.searchRequest);

/** ------------------------------ Future Needs ------------------------------------ */
router.get('/needs/:id', TokenValidation, fileController.getNeedsClient);
router.post('/serarchN', TokenValidation, fileController.searchNeeds);

export default router;