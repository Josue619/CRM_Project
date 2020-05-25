"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
exports.TokenValidation = (req, res, next) => {
    const token = req.header('auth_token');
    const errors = express_validator_1.validationResult(req);
    if (!token)
        return res.status(401).json({ errors: [{
                    "location": "body",
                    "msg": "Access denied, invalid token",
                    "param": "aunt_token"
                }]
        });
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    req.userId = payload._id;
    next();
};
//# sourceMappingURL=verifyToken.js.map