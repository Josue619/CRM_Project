import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import binnacleController from '../controllers/binnacleController';

const router: Router = Router();

/** ------------------------------ Request ------------------------------------ */
router.get('/requestsCheck/:id', TokenValidation, binnacleController.getRequestsCheck);
router.post('/serarchCheck', TokenValidation, binnacleController.searchRequestCheck);
router.get('/requests/:id', TokenValidation, binnacleController.getRequests);
router.post('/serarch', TokenValidation, binnacleController.searchRequest);
router.get('/binnacles', TokenValidation, binnacleController.getBinnacles);
router.post('/binnacles', TokenValidation, binnacleController.addBinnacle);
router.post('/serarchBinnacles', TokenValidation, binnacleController.searchBinnacles);
router.put('/binnacle/:id', TokenValidation, binnacleController.deleteBinnacle);

export default router;