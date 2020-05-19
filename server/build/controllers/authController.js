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
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Saving new user
            const user = new User_1.User();
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.card_id = req.body.card_id;
            user.phone = req.body.phone;
            user.roll = req.body.roll;
            user.state = req.body.state;
            //Encrypting password
            user.password = yield user.encryptPassword(user.password);
            //Creating new user
            yield database_1.default.query('INSERT INTO users set ?', user);
            const savedUser = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [user.email]);
            //Creating new token
            const token = jsonwebtoken_1.default.sign({ _id: savedUser[0].id }, process.env.TOKEN_SECRET || 'tokentest');
            res.header('auth-token', token).json(savedUser[0]);
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new User_1.User();
            const user = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
            if (!user[0])
                return res.status(400).json('Email or password is wrong');
            const correctPass = yield userClass.validatedPassword(req.body.password, user[0].password);
            if (!correctPass)
                return res.status(400).json('Invalid Password');
            const token = jsonwebtoken_1.default.sign({ _id: user[0].id }, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            //console.log(token);
            //res.header('auth-token', token).json(user[0]);
            res.json({
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