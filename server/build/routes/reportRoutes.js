"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const reportController_1 = __importDefault(require("../controllers/reportController"));
const router = express_1.Router();
/** ------------------------------ Request ------------------------------------ */
router.get('/binnacles', verifyToken_1.TokenValidation, reportController_1.default.getBinnacles);
router.post('/serarchBinnacles', verifyToken_1.TokenValidation, reportController_1.default.searchBinnacles);
exports.default = router;
//# sourceMappingURL=reportRoutes.js.map