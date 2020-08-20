"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const reportController_1 = __importDefault(require("../controllers/reportController"));
const mailController_1 = __importDefault(require("../controllers/mailController"));
var multer = require('multer');
var upload = multer();
const router = express_1.Router();
/** ------------------------------ Binnacle ------------------------------------ */
router.get('/binnacles', verifyToken_1.TokenValidation, reportController_1.default.getBinnacles);
router.post('/serarchBinnacles', verifyToken_1.TokenValidation, reportController_1.default.searchBinnacles);
/** ------------------------------ Planner ------------------------------------ */
router.get('/events', verifyToken_1.TokenValidation, reportController_1.default.getEvents);
router.post('/serarchEvents', verifyToken_1.TokenValidation, reportController_1.default.searchEvents);
/** ------------------------------ Upload report ------------------------------------ */
//router.post('/uploadReport', upload.single('file'), function (req: any, res: any) {
//    console.log(req.file);
//    
//})
router.post('/uploadReport', upload.single('file'), verifyToken_1.TokenValidation, mailController_1.default.uploadReport);
exports.default = router;
//# sourceMappingURL=reportRoutes.js.map