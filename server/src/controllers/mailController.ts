import { User } from "models/User";
import nodemailer from 'nodemailer';
import { Planner } from "models/Planner";
import moment from 'moment';

export class MailController {

    public async sendMail(user: User): Promise<void> {
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

        const transport = nodemailer.createTransport({
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

        const info = await transport.sendMail({
            from: "'CRM SYSTEM' <crm@test.com>",
            to: user.email,
            subject: 'Formulario de contacto del sitio web',
            html: contentHTML
        });

        console.log('Mensaje: ', info.messageId);
    };

    public async sendMailClient(user: User, password: string): Promise<void> {
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

        const transport = nodemailer.createTransport({
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

        const info = await transport.sendMail({
            from: "'CRM SYSTEM' <crmgrv@gruporv.net>",
            to: user.email,
            subject: 'Formulario de contacto del sitio web',
            html: contentHTML
        });

        console.log('Mensaje: ', info.messageId);
    };

    public async sendMailEvent(user: User, event: Planner): Promise<void> {
        const msg = 'Se le recuerda que tiene un evento agendado para hoy';
        const contentHTML = `
            <h1>Información de evento</h1>

            <ul>
                <li>Usuario: ${user.username}</li>
                <li>Titulo del evento: ${event.title}</li>
                <li>Descripción: ${event.description}</li>
                <li>Fecha y hora de inicio: ${ moment(event.start).format('DD/MM/YYYY HH:mm') }</li>
            </ul>
            <p>${msg}</p>
        `;

        const transport = nodemailer.createTransport({
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

        const info = await transport.sendMail({
            from: "'CRM SYSTEM' <crm@test.com>",
            to: user.email,
            subject: 'Recordatorio de eventos pendientes',
            html: contentHTML
        });

        console.log('Mensaje: ', info.messageId);
    };

    public async sendMailG(user: User): Promise<void> {
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

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "josue.martinez.mc@gmail.com",
              pass: ""
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transport.sendMail({
            from: "'CRM SYSTEM' <crm@test.com>",
            to: user.email,
            subject: 'Formulario de contacto del sitio web',
            html: contentHTML
        });

        console.log('Mensaje: ', info.messageId);
    };

}

const mailController = new MailController();
export default mailController;