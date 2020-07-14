import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { RequestC } from '../models/Request';
import db from '../database';


export class FileController {
    
    public async getRequests (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ?', [id, true]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "This client has no queries" }] });
    }

    public async getRequest (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id = ? AND state = ?', [id, true]);
        if (request.length > 0) {
            return res.json(request[0]);
        }
        return res.status(401).json({ errors: [{ "msg": "A problem occurred while selecting the query" }] });
    }

    public async searchRequest(req: Request, res: Response) {
        const product = await db.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%'");
        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    }

    public async updateRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The request was updated'});
    }
    
    public async deleteRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        req.body.state = false; 
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The request was deleted'});
    }
    
}

const fileController = new FileController();
export default fileController;