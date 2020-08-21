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
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.Router();
const user = new User_1.User();
router.post('/signup', [
    express_validator_1.check('email').isEmail().withMessage('Wrong email format').custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield user.verifyEmail(email)) {
            throw new Error('Email already registered');
        }
    })),
    express_validator_1.check('password').isLength({ min: 8 }).withMessage('The password must contain 8 characters')
], verifyUser_1.UserValidation, authController_1.default.signup);
router.post('/signin', authController_1.default.signin);
/** ------------------------------------------------- WEB Client ---------------------------------------------------- */
router.post('/login', authController_1.default.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map