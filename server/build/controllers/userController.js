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
            if (user.username == null || user.username == '')
                return res.status(401).json({ errors: [{ "msg": "Debe ingresar un nombre en el campo reservado." }] });
            if (user.card_id == null || user.card_id.toString().length <= 8)
                return res.status(401).json({ errors: [{ "msg": "El número de cédula debe contener al menos 9 dígitos." }] });
            if (user.code_phone == null)
                return res.status(401).json({ errors: [{ "msg": "Debe seleccionar un codigo de país." }] });
            if (user.phone == null)
                return res.status(401).json({ errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });
            if (user.phone.toString().length != 8)
                return res.status(401).json({ errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });
            if (user.roll == null)
                return res.status(401).json({ errors: [{ "msg": "Debe seleccionar un cargo." }] });
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
    getClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM users WHERE roll = ? AND state = ? LIMIT 10', ['Client', true]);
            res.status(200).json(users);
        });
    }
    searchClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query("SELECT * FROM users WHERE (username LIKE '%" + req.body.search + "%' OR email LIKE '%" + req.body.search + "%' OR " +
                "card_id LIKE '%" + req.body.search + "%' OR code_phone LIKE '%" + req.body.search + "%' OR " +
                "phone LIKE '%" + req.body.search + "%') " +
                "AND roll = ? AND state = ? ORDER BY id DESC LIMIT 10", ['Client', true]);
            if (users.length > 0) {
                return res.status(200).json(users);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
                    }]
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (users.length > 0) {
                return res.json(users[0]);
            }
            res.status(404).json({ text: 'El usuario no existe en el registro.' });
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'El usuario fue actualizado.' });
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.body.state = false;
            yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'El usuario fue eliminado.' });
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
//Traer rutas del respectivo controlador
exports.default = userController;
//# sourceMappingURL=userController.js.map