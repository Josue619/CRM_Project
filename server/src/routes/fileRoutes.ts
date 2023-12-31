import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import fileController from '../controllers/fileController';

const router: Router = Router();
/** ------------------------------ Request ------------------------------------ */
router.post('/request', TokenValidation, fileController.addRequest);
router.get('/requests/:id', TokenValidation, fileController.getRequests);
router.get('/request/:id', TokenValidation, fileController.getRequest);
router.put('/requests/:id', TokenValidation, fileController.updateRequest);
router.put('/request/:id', TokenValidation, fileController.deleteRequest);
router.post('/serarch', TokenValidation, fileController.searchRequest);

/** ------------------------------ Future Needs ------------------------------------ */
router.get('/needs/:id', TokenValidation, fileController.getNeedsClient);
router.post('/serarchN', TokenValidation, fileController.searchNeeds);
router.post('/need', TokenValidation, fileController.addNeed);
router.put('/need/:id', TokenValidation, fileController.updateNeed);
router.delete('/need/:id', TokenValidation, fileController.deleteNeed);

/** ------------------------------ Supports ------------------------------------ */
router.get('/supports/:id', TokenValidation, fileController.getSupports);
router.post('/serarchS', TokenValidation, fileController.searchSuports);
router.post('/support', TokenValidation, fileController.addSuport);
router.put('/support/:id', TokenValidation, fileController.updateSuport);
router.delete('/support/:id', TokenValidation, fileController.deleteSupport);

/** ------------------------------ Notes ------------------------------------ */
router.post('/serarchT', TokenValidation, fileController.searchNotes);
router.get('/notes/:id', TokenValidation, fileController.getNotes);
router.get('/notesC/:id', TokenValidation, fileController.getNotesC);
router.post('/notes', TokenValidation, fileController.addNote);
router.put('/note/:id', TokenValidation, fileController.updateNote);
router.patch('/notes/:id', TokenValidation, fileController.checkAll);
router.delete('/note/:id', TokenValidation, fileController.deleteNote);
router.delete('/notes/:id', TokenValidation, fileController.deleteCompleted);

export default router;