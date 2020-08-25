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
                    msg = 'Esta consulta ya está en el registro de la bitácora.'
                }
                
            }
        }

        if (msg == '') {
            await db.query('INSERT INTO binnacle set ?', [binnacle]); 
            return res.json("La información se agregó al registro con éxito.");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async getBinnacles(req: Request, res: Response) {

        const binnacleDB = await db.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution " +
        "FROM binnacle AS b " +
        "INNER JOIN users AS u ON b.id_Client = u.id " +
        "INNER JOIN requests AS r ON b.id_Request = r.id " +
        "WHERE b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
        "ORDER BY b.id DESC LIMIT 10", [true]);

        if (binnacleDB.length > 0) {
            return res.json(binnacleDB);
        }
        return res.status(401).json({ errors: [{ "msg": "No hay contenido en la bitácora." }] });
    }

    public async searchBinnacles(req: Request, res: Response) {
        const binnacleDB = await db.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution " +
        "FROM binnacle AS b " +
        "INNER JOIN users AS u ON b.id_Client = u.id " +
        "INNER JOIN requests AS r ON b.id_Request = r.id " +
        "WHERE (u.username LIKE '%" + req.body.search + "%' OR u.email LIKE '%" + req.body.search + "%' OR " +
        "u.card_id LIKE '%" + req.body.search + "%' OR u.code_phone LIKE '%" + req.body.search + "%' OR " +
        "u.phone LIKE '%" + req.body.search + "%' OR r.query LIKE '%" + req.body.search + "%' OR " +
        "r.solution LIKE '%" + req.body.search + "%')" +
        "AND b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
        "ORDER BY b.id DESC LIMIT 10", [true]);

        if (binnacleDB.length > 0) {
            return res.status(200).json(binnacleDB);
        }

        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async getRequestsCheck (req: Request, res: Response) {
        const { id } = req.params;   
        const solution = 'No definida';
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution != ? ORDER BY id DESC LIMIT 10', [id, true, solution]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no tiene consultas resueltas." }] });
    }

    public async searchRequestCheck (req: Request, res: Response) {
        const id = req.body.id;
        const solution = 'No definida'; 

        const request = await db.query("SELECT * FROM requests WHERE (query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%') " +
        "AND id_Client = ? AND state = ? AND solution != ? ORDER BY id DESC LIMIT 10", [id, true, solution]);

        if (request.length > 0) {
            return res.status(200).json(request);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async getRequests (req: Request, res: Response) {
        const { id } = req.params;   
        const solution = 'No definida';
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution = ? ORDER BY id DESC LIMIT 10', [id, true, solution]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no posee consultas en proceso." }] });
    }

    public async searchRequest(req: Request, res: Response) {
        const id = req.body.id;
        const solution = 'No definida';

        const request = await db.query("SELECT * FROM requests WHERE (query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%') " +
        "AND id_Client = ? AND state = ? AND solution = ? ORDER BY id DESC LIMIT 10", [id, true, solution]);
        
        if (request.length > 0) {
            return res.status(200).json(request);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async deleteBinnacle (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        const binnacle: Binnacle = req.body;
        
        await db.query('UPDATE binnacle SET state = ? WHERE id = ? AND id_Client = ? AND id_Request = ?', [false, id, binnacle.id_Client, binnacle.id_Request]);
        res.status(200).json({msg: 'La solicitud fue eliminada.'});
    }

}

const binnacleController = new BinnacleController();
export default binnacleController;