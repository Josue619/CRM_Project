import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import plannerController from '../controllers/plannerController';

const router: Router = Router();

/** ------------------------------ Planner ------------------------------------ */
router.get('/events/:id', TokenValidation, plannerController.getEvents);
router.post('/event', TokenValidation, plannerController.addEvent);
router.put('/event/:id', TokenValidation, plannerController.editEvent);
router.delete('/event/:id', TokenValidation, plannerController.deleteEvent);

export default router;