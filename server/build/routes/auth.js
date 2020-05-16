"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.Router();
router.post('/signup', authController_1.default.signup);
router.post('/signin', authController_1.default.signin);
router.get('/profile', verifyToken_1.TokenValidation, authController_1.default.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map