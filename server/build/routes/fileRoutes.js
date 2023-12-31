"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const fileController_1 = __importDefault(require("../controllers/fileController"));
const router = express_1.Router();
/** ------------------------------ Request ------------------------------------ */
router.post('/request', verifyToken_1.TokenValidation, fileController_1.default.addRequest);
router.get('/requests/:id', verifyToken_1.TokenValidation, fileController_1.default.getRequests);
router.get('/request/:id', verifyToken_1.TokenValidation, fileController_1.default.getRequest);
router.put('/requests/:id', verifyToken_1.TokenValidation, fileController_1.default.updateRequest);
router.put('/request/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteRequest);
router.post('/serarch', verifyToken_1.TokenValidation, fileController_1.default.searchRequest);
/** ------------------------------ Future Needs ------------------------------------ */
router.get('/needs/:id', verifyToken_1.TokenValidation, fileController_1.default.getNeedsClient);
router.post('/serarchN', verifyToken_1.TokenValidation, fileController_1.default.searchNeeds);
router.post('/need', verifyToken_1.TokenValidation, fileController_1.default.addNeed);
router.put('/need/:id', verifyToken_1.TokenValidation, fileController_1.default.updateNeed);
router.delete('/need/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteNeed);
/** ------------------------------ Supports ------------------------------------ */
router.get('/supports/:id', verifyToken_1.TokenValidation, fileController_1.default.getSupports);
router.post('/serarchS', verifyToken_1.TokenValidation, fileController_1.default.searchSuports);
router.post('/support', verifyToken_1.TokenValidation, fileController_1.default.addSuport);
router.put('/support/:id', verifyToken_1.TokenValidation, fileController_1.default.updateSuport);
router.delete('/support/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteSupport);
/** ------------------------------ Notes ------------------------------------ */
router.post('/serarchT', verifyToken_1.TokenValidation, fileController_1.default.searchNotes);
router.get('/notes/:id', verifyToken_1.TokenValidation, fileController_1.default.getNotes);
router.get('/notesC/:id', verifyToken_1.TokenValidation, fileController_1.default.getNotesC);
router.post('/notes', verifyToken_1.TokenValidation, fileController_1.default.addNote);
router.put('/note/:id', verifyToken_1.TokenValidation, fileController_1.default.updateNote);
router.patch('/notes/:id', verifyToken_1.TokenValidation, fileController_1.default.checkAll);
router.delete('/note/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteNote);
router.delete('/notes/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteCompleted);
exports.default = router;
//# sourceMappingURL=fileRoutes.js.map