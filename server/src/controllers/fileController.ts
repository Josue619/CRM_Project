import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { RequestC } from '../models/Request';
import db from '../database';


export class FileController {
    
    public async getRequest (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ?', [id]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "This client has no queries" }] });
    }
    
}

const fileController = new FileController();
export default fileController;