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
const moment_1 = __importDefault(require("moment"));
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
    sendMailClient(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'Los datos de su usuario han sido registrados en el siatema del CRM';
            const contentHTML = `
            <h1>Información de usuario</h1>

            <ul>
                <li>Nombre de usuario: ${user.username}</li>
                <li>Coreo: ${user.email}</li>
                <li>Contraseña: ${password}</li>
                <li>Telefono: ${user.phone}</li>
            </ul>
            <p>${msg}</p>
        `;
            const transport = nodemailer_1.default.createTransport({
                host: "mail.gruporv.net",
                port: 587,
                secure: false,
                auth: {
                    user: "crmgrv@gruporv.net",
                    pass: "crmgrv"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const info = yield transport.sendMail({
                from: "'CRM SYSTEM' <crmgrv@gruporv.net>",
                to: user.email,
                subject: 'Formulario de contacto del sitio web',
                html: contentHTML
            });
            console.log('Mensaje: ', info.messageId);
        });
    }
    ;
    sendMailEvent(user, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'Se le recuerda que tiene un evento agendado para hoy';
            const contentHTML = `
            <h1>Información de evento</h1>

            <ul>
                <li>Usuario: ${user.username}</li>
                <li>Titulo del evento: ${event.title}</li>
                <li>Descripción: ${event.description}</li>
                <li>Fecha y hora de inicio: ${moment_1.default(event.start).format('DD/MM/YYYY HH:mm')}</li>
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
                subject: 'Recordatorio de eventos pendientes',
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