import db from '../database';
import { Request, Response } from 'express';
import { Binnacle } from 'models/Binnacle';

export class BinnacleController {

    /** ------------------------------------------------- Binnacle ---------------------------------------------------- */

    public async addBinnacle(req: Request, res: Response) {  
        const binnacle: Binnacle = req.body;
        var msg: string = '';

        const binnacleDB = await db.query('SELECT * FROM binnacle WHERE id_Client = ? AND id_Request', [binnacle.id_Client, binnacle.id_Request]);

        if (binnacleDB.length > 0) {
            for (let i = 0; i < binnacleDB.length; i++) {
                
                if (binnacle.id_Client == binnacleDB[i].id_Client && binnacle.id_Request == binnacleDB[i].id_Request) {
                    msg = 'This query is already in the registry of the blog'
                }
                
            }
        }

        if (msg == '') {
            await db.query('INSERT INTO binnacle set ?', [binnacle]); 
            return res.json("The information was added to the log successfully");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async getBinnacles(req: Request, res: Response) {

        const binnacleDB = await db.query("SELECT b.id, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution " +
        "FROM binnacle AS b " +
        "INNER JOIN users AS u ON b.id_Client = u.id " +
        "INNER JOIN requests AS r ON b.id_Request = r.id " +
        "WHERE b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
        "ORDER BY b.id DESC LIMIT 10", [true]);

        if (binnacleDB.length > 0) {
            return res.json(binnacleDB);
        }
        return res.status(401).json({ errors: [{ "msg": "There is no content in the blog." }] });
    }

    public async getRequestsCheck (req: Request, res: Response) {
        const { id } = req.params;   
        const solution = 'No definida';
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution != ?', [id, true, solution]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "This client has no answered queries." }] });
    }

    public async searchRequestCheck (req: Request, res: Response) {
        const solution = 'No definida';
        const product = await db.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%'AND state = ? AND solution != ?", [true, solution]);
        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    }

    public async getRequests (req: Request, res: Response) {
        const { id } = req.params;   
        const solution = 'No definida';
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution = ?', [id, true, solution]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "This customer has no queries waiting." }] });
    }

    public async searchRequest(req: Request, res: Response) {
        const solution = 'No definida';
        const product = await db.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%'AND state = ? AND solution = ?", [true, solution]);
        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    }

}

const binnacleController = new BinnacleController();
export default binnacleController;