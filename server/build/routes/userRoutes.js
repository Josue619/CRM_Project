"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
const verifyUser_1 = require("../libs/verifyUser");
const verifyToken_1 = require("../libs/verifyToken");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.Router();
const user = new User_1.User();
router.post('/client', [
    express_validator_1.check('email').isEmail().withMessage('Wrong email format').custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield user.verifyEmail(email)) {
            throw new Error('Email already registered');
        }
    }))
], verifyUser_1.UserValidation, verifyToken_1.TokenValidation, userController_1.default.createClient);
router.get('/clients', verifyToken_1.TokenValidation, userController_1.default.getClients);
router.post('/serarchClient', verifyToken_1.TokenValidation, userController_1.default.searchClients);
router.get('/client/:id', verifyToken_1.TokenValidation, userController_1.default.getOne);
router.put('/clients/:id', [
    express_validator_1.check('email').isEmail().withMessage('Wrong email format')
], verifyUser_1.UserValidation, verifyToken_1.TokenValidation, userController_1.default.updateClient);
router.put('/client/:id', verifyToken_1.TokenValidation, userController_1.default.deleteClient);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map