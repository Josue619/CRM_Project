import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import db from '../database';

import mailController, { MailController } from './mailController';

export class UserController {
    
    public async createClient (req: Request, res: Response): Promise<void> {
        const userClass: User = new User();
        const code = userClass.generatePassword();
        req.body.password = code;

        //Saving new user
        let user: User = req.body;
        user.email.toLocaleLowerCase();

        //Encrypting password
        user.password = await userClass.encryptPassword(user.password);

        //Creating new user
        await db.query('INSERT INTO users set ?', user)
        const savedUser =  await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
        const iss = 'http://localhost:3000/api/auth/client'
        //Creating new token
        const token: string = jwt.sign({_id: savedUser[0].id, iss: iss}, process.env.TOKEN_SECRET || 'tokentest');
        mailController.sendMailClient(user, code);

        res.status(200).header('auth_token', token).json({
            'auth_token': token,
            'user': savedUser[0]
        });

    } 

    public async getClients (req: Request, res: Response) {
        const users = await db.query('SELECT * FROM users WHERE roll = ?', 'Client');
        console.log(users);
        res.status(200).json(users);
    } 

    public async searchClients (req: Request, res: Response) {
        const users = await db.query('SELECT * FROM users WHERE username' + " like '%" + req.body.search + "%' AND roll = ?", 'Client');
        res.status(200).json(users);
    } 
    
}

const userController = new UserController();
export default userController;