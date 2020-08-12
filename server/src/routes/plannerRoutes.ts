import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import plannerController from '../controllers/plannerController';

const router: Router = Router();

/** ------------------------------ Planner ------------------------------------ */
router.get('/events/:id', TokenValidation, plannerController.getEvents);
router.post('/addEvents', TokenValidation, plannerController.addEvent);

export default router;