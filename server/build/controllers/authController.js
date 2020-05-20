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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const database_1 = __importDefault(require("../database"));
const mailController_1 = __importDefault(require("./mailController"));
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new User_1.User();
            //Saving new user
            let user = req.body;
            user.email.toLocaleLowerCase();
            //Encrypting password
            user.password = yield userClass.encryptPassword(user.password);
            //Creating new user
            yield database_1.default.query('INSERT INTO users set ?', user);
            const savedUser = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [user.email]);
            const iss = 'http://localhost:3000/api/auth/signup';
            //Creating new token
            const token = jsonwebtoken_1.default.sign({ _id: savedUser[0].id, iss: iss }, process.env.TOKEN_SECRET || 'tokentest');
            mailController_1.default.sendMail(user);
            res.header('auth_token', token).json({
                'auth_token': token,
                'user': savedUser[0]
            });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new User_1.User();
            const email = req.body.email.toLowerCase();
            const iss = 'http://localhost:3000/api/auth/signin';
            const user = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
            if (!user[0])
                return res.status(400).json('Email or password is wrong');
            const correctPass = yield userClass.validatedPassword(req.body.password, user[0].password);
            if (!correctPass)
                return res.status(400).json('Invalid Password');
            const token = jsonwebtoken_1.default.sign({ _id: user[0].id, iss: iss }, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            res.header('auth_token', token).json({
                'auth_token': token,
                'user': user[0]
            });
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [req.userId]);
            user[0].password = '0';
            if (!user[0])
                return res.status(404).json('No User Found');
            res.json(user[0]);
        });
    }
    ;
}
exports.AuthController = AuthController;
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authController.js.map