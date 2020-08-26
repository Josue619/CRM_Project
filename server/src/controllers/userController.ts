import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import db from '../database';

import mailController from './mailController';

export class UserController {
    
    public async createClient (req: Request, res: Response) {
        const userClass: User = new User();
        const code = userClass.generatePassword();
        req.body.password = code;
        
        //Saving new user
        let user: User = req.body;
        user.email.toLocaleLowerCase();

        //Encrypting password
        user.password = await userClass.encryptPassword(user.password);

        if (user.username == null || user.username == '') return res.status(401).json({ errors: [{ "msg": "Debe ingresar un nombre en el campo reservado." }] });

        if (user.card_id == null || user.card_id.toString().length <= 8) return res.status(401).json({ errors: [{ "msg": "El número de cédula debe contener al menos 9 dígitos." }] });

        if (user.code_phone == null) return res.status(401).json({ errors: [{ "msg": "Debe seleccionar un codigo de país." }] });

        if (user.phone == null) return res.status(401).json({ errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });

        if (user.phone.toString().length != 8) return res.status(401).json({ errors: [{ "msg": "El número de teléfono debe contener 8 dígitos." }] });

        if (user.roll == null) return res.status(401).json({ errors: [{ "msg": "Debe seleccionar un cargo." }] });

        //Creating new user
        await db.query('INSERT INTO users set ?', user)
        const savedUser =  await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
        const iss = 'http://localhost:3000/api/auth/client';
        //Creating new token
        const token: string = jwt.sign({_id: savedUser[0].id, iss: iss}, process.env.TOKEN_SECRET || 'tokentest');
        mailController.sendMailClient(user, code);

        res.status(200).header('auth_token', token).json({
            'auth_token': token,
            'user': savedUser[0]
        });

    } 

    public async getClients (req: Request, res: Response) {
        const users = await db.query('SELECT * FROM users WHERE roll = ? AND state = ? LIMIT 10', ['Client', true]);
        res.status(200).json(users);
    } 

    public async searchClients (req: Request, res: Response) {

        const users = await db.query("SELECT * FROM users WHERE (username LIKE '%" + req.body.search + "%' OR email LIKE '%" + req.body.search + "%' OR " +
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
    } 

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;   
        const users = await db.query('SELECT * FROM users WHERE id = ?', [id]); 
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({text: 'El usuario no existe en el registro.'});
    } 

    public async updateClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El usuario fue actualizado.'});
    }

    public async deleteClient (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        req.body.state = false; 
        await db.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El usuario fue eliminado.'});
    }
    
}

const userController = new UserController();
//Traer rutas del respectivo controlador
export default userController;