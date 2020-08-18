"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const binnacleController_1 = __importDefault(require("../controllers/binnacleController"));
const router = express_1.Router();
/** ------------------------------ Request ------------------------------------ */
router.get('/requestsCheck/:id', verifyToken_1.TokenValidation, binnacleController_1.default.getRequestsCheck);
router.post('/serarchCheck', verifyToken_1.TokenValidation, binnacleController_1.default.searchRequestCheck);
router.get('/requests/:id', verifyToken_1.TokenValidation, binnacleController_1.default.getRequests);
router.post('/serarch', verifyToken_1.TokenValidation, binnacleController_1.default.searchRequest);
router.get('/binnacles', verifyToken_1.TokenValidation, binnacleController_1.default.getBinnacles);
router.post('/binnacles', verifyToken_1.TokenValidation, binnacleController_1.default.addBinnacle);
router.post('/serarchBinnacles', verifyToken_1.TokenValidation, binnacleController_1.default.searchBinnacles);
router.put('/binnacle/:id', verifyToken_1.TokenValidation, binnacleController_1.default.deleteBinnacle);
exports.default = router;
//# sourceMappingURL=binnacleRoutes.js.map