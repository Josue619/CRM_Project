import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";

interface IPayload {
    _id: string;
    iss: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth_token');
    const errors = validationResult(req);
    if (!token) return res.status(401).json({ errors: [{
        "location": "body",
        "msg": "Access denied, invalid token",
        "param": "aunt_token"
        }]
    });

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    req.userId = payload._id;

    next();
}