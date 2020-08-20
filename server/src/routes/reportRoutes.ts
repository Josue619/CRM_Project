import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import reportController from '../controllers/reportController';
import mailController from '../controllers/mailController';

var multer  = require('multer');
var upload = multer();


const router: Router = Router();

/** ------------------------------ Binnacle ------------------------------------ */
router.get('/binnacles', TokenValidation, reportController.getBinnacles);
router.post('/serarchBinnacles', TokenValidation, reportController.searchBinnacles);

/** ------------------------------ Planner ------------------------------------ */
router.get('/events', TokenValidation, reportController.getEvents);
router.post('/serarchEvents', TokenValidation, reportController.searchEvents);

/** ------------------------------ Upload report ------------------------------------ */
//router.post('/uploadReport', upload.single('file'), function (req: any, res: any) {
//    console.log(req.file);
//    
//})

router.post('/uploadReport', upload.single('file'), TokenValidation, mailController.uploadReport);

export default router;