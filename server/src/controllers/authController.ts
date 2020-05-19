import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import db from '../database';

export class AuthController {
    
    public async signup (req: Request, res: Response): Promise<void> {
        //Saving new user
        const user: User = new User();
        user.username = req.body.username;
        user.email = req.body.email.toLowerCase();
        user.password = req.body.password;
        user.card_id = req.body.card_id;
        user.code_phone = req.body.code_phone;
        user.phone = req.body.phone;
        user.roll = req.body.roll;
        user.state = req.body.state;

        //Encrypting password
        user.password = await user.encryptPassword(user.password);

        //Creating new user
        await db.query('INSERT INTO users set ?', user)
        const savedUser =  await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
        const iss = 'http://localhost:300/api/auth/signup';

        //Creating new token
        const token: string = jwt.sign({_id: savedUser[0].id, iss: iss}, process.env.TOKEN_SECRET || 'tokentest');

        res.header('auth-token', token).json({
            'auth_token': token,
            'user': savedUser[0]
        })
    } 

    public async signin (req: Request, res: Response) {
        const userClass: User = new User();
        const email = req.body.email.toLowerCase();
        const iss = 'http://localhost:300/api/auth/signin';

        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user[0]) return res.status(400).json('Email or password is wrong');

        const correctPass: boolean = await userClass.validatedPassword(req.body.password, user[0].password);
        if (!correctPass) return res.status(400).json('Invalid Password');

        const token: string = jwt.sign({_id: user[0].id, iss: iss} , process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        });

        //console.log(token);

        //res.header('auth-token', token).json(user[0]);
        res.header('auth-token', token).json({
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