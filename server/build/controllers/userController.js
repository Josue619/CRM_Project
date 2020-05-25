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
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const database_1 = __importDefault(require("../database"));
const mailController_1 = __importDefault(require("./mailController"));
class UserController {
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new User_1.User();
            const code = userClass.generatePassword();
            req.body.password = code;
            //Saving new user
            let user = req.body;
            user.email.toLocaleLowerCase();
            //Encrypting password
            user.password = yield userClass.encryptPassword(user.password);
            //Creating new user
            yield database_1.default.query('INSERT INTO users set ?', user);
            const savedUser = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [user.email]);
            const iss = 'http://localhost:3000/api/auth/client';
            //Creating new token
            const token = jsonwebtoken_1.default.sign({ _id: savedUser[0].id, iss: iss }, process.env.TOKEN_SECRET || 'tokentest');
            mailController_1.default.sendMailClient(user, code);
            res.status(200).header('auth_token', token).json({
                'auth_token': token,
                'user': savedUser[0]
            });
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map