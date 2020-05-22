import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import db from '../database';

import mailController, { MailController } from './mailController';

export class AuthController {
    
    public async signup (req: Request, res: Response): Promise<void> {
        const userClass: User = new User();

        //Saving new user
        let user: User = req.body;
        user.email.toLocaleLowerCase();

        //Encrypting password
        user.password = await userClass.encryptPassword(user.password);

        //Creating new user
        await db.query('INSERT INTO users set ?', user)
        const savedUser =  await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
        const iss = 'http://localhost:3000/api/auth/signup';

        //Creating new token
        const token: string = jwt.sign({_id: savedUser[0].id, iss: iss}, process.env.TOKEN_SECRET || 'tokentest');
        mailController.sendMail(user);
        //mailController.sendMailG(user);

        res.header('auth_token', token).json({
            'auth_token': token,
            'user': savedUser[0]
        })
    } 

    public async signin (req: Request, res: Response) {
        const userClass: User = new User();
        const email = req.body.email.toLowerCase();
        const iss = 'http://localhost:3000/api/auth/signin';

        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user[0]) return res.status(400).json('Email or password is wrong');

        const correctPass: boolean = await userClass.validatedPassword(req.body.password, user[0].password);
        if (!correctPass) return res.status(400).json('Invalid Password');

        const token: string = jwt.sign({_id: user[0].id, iss: iss} , process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        });

        res.header('auth_token', token).json({
            'auth_token': token,
            'user': user[0]
        })
    } 

    public async profile(req: Request, res: Response) {
        const user = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);
        user[0].password = '0';
        if (!user[0]) return res.status(404).json('No User Found');
        res.json(user[0]);
    };
    
}

const authController = new AuthController();
export default authController;