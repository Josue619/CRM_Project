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
exports.MailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailController {
    sendMail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'Los datos de su usuario han sido registrados en el siatema del CRM';
            const contentHTML = `
            <h1>Información de usuario</h1>

            <ul>
                <li>Nombre de usuario: ${user.username}</li>
                <li>Coreo: ${user.email}</li>
                <li>Telefono: ${user.phone}</li>
            </ul>
            <p>${msg}</p>
        `;
            const transport = nodemailer_1.default.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false,
                auth: {
                    user: "8f820a0b5aed69",
                    pass: "b6bde7fd60b944"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = yield transport.sendMail({
                from: "'CRM SYSTEM' <crm@test.com>",
                to: user.email,
                subject: 'Formulario de contacto del sitio web',
                html: contentHTML
            });
            console.log('Mensaje: ', info.messageId);
        });
    }
    ;
    sendMailG(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'Los datos de su usuario han sido registrados en el siatema del CRM';
            const contentHTML = `
            <h1>Información de usuario</h1>

            <ul>
                <li>Nombre de usuario: ${user.username}</li>
                <li>Coreo: ${user.email}</li>
                <li>Telefono: ${user.phone}</li>
            </ul>
            <p>${msg}</p>
        `;
            const transport = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: "josue.martinez.mc@gmail.com",
                    pass: ""
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = yield transport.sendMail({
                from: "'CRM SYSTEM' <crm@test.com>",
                to: user.email,
                subject: 'Formulario de contacto del sitio web',
                html: contentHTML
            });
            console.log('Mensaje: ', info.messageId);
        });
    }
    ;
}
exports.MailController = MailController;
const mailController = new MailController();
exports.default = mailController;
//# sourceMappingURL=mailController.js.map