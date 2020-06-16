"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const fileController_1 = __importDefault(require("../controllers/fileController"));
const router = express_1.Router();
router.get('/request/:id', verifyToken_1.TokenValidation, fileController_1.default.getRequest);
exports.default = router;
//# sourceMappingURL=fileRoutes.js.map