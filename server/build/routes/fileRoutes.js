"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const fileController_1 = __importDefault(require("../controllers/fileController"));
const router = express_1.Router();
router.get('/requests/:id', verifyToken_1.TokenValidation, fileController_1.default.getRequests);
router.get('/request/:id', verifyToken_1.TokenValidation, fileController_1.default.getRequest);
router.put('/requests/:id', verifyToken_1.TokenValidation, fileController_1.default.updateRequest);
router.put('/request/:id', verifyToken_1.TokenValidation, fileController_1.default.deleteRequest);
router.post('/serarch', verifyToken_1.TokenValidation, fileController_1.default.searchRequest);
exports.default = router;
//# sourceMappingURL=fileRoutes.js.map