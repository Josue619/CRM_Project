import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import reportController from '../controllers/reportController';

const router: Router = Router();

/** ------------------------------ Request ------------------------------------ */
router.get('/binnacles', TokenValidation, reportController.getBinnacles);
router.post('/serarchBinnacles', TokenValidation, reportController.searchBinnacles);

export default router;