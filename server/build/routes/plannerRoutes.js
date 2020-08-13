"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const plannerController_1 = __importDefault(require("../controllers/plannerController"));
const router = express_1.Router();
/** ------------------------------ Planner ------------------------------------ */
router.get('/events/:id', verifyToken_1.TokenValidation, plannerController_1.default.getEvents);
router.post('/event', verifyToken_1.TokenValidation, plannerController_1.default.addEvent);
router.put('/event/:id', verifyToken_1.TokenValidation, plannerController_1.default.editEvent);
router.delete('/event/:id', verifyToken_1.TokenValidation, plannerController_1.default.deleteEvent);
exports.default = router;
//# sourceMappingURL=plannerRoutes.js.map