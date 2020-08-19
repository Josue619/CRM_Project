import db from '../database';
import { Request, Response } from 'express';

export class ReportController {

    /** ------------------------------------------------- Binnacle ---------------------------------------------------- */

    public async getBinnacles(req: Request, res: Response) {

        const binnacleDB = await db.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution, b.created_at " +
        "FROM binnacle AS b " +
        "INNER JOIN users AS u ON b.id_Client = u.id " +
        "INNER JOIN requests AS r ON b.id_Request = r.id " +
        "WHERE YEAR(b.created_at) = YEAR(CURRENT_DATE()) AND MONTH(b.created_at) = MONTH(CURRENT_DATE()) AND " +
        "b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
        "ORDER BY b.id DESC LIMIT 10", [true]);

        if (binnacleDB.length > 0) {
            return res.json(binnacleDB);
        }
        return res.status(401).json({ errors: [{ "msg": "There is no content in the blog." }] });
    }

    public async searchBinnacles(req: Request, res: Response) {
        const binnacleDB = await db.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution, b.created_at " +
        "FROM binnacle AS b " +
        "INNER JOIN users AS u ON b.id_Client = u.id " +
        "INNER JOIN requests AS r ON b.id_Request = r.id " +
        "WHERE (u.username LIKE '%" + req.body.search + "%' OR u.email LIKE '%" + req.body.search + "%' OR " +
        "u.card_id LIKE '%" + req.body.search + "%' OR u.code_phone LIKE '%" + req.body.search + "%' OR " +
        "u.phone LIKE '%" + req.body.search + "%' OR r.query LIKE '%" + req.body.search + "%' OR " +
        "r.solution LIKE '%" + req.body.search + "%' OR b.created_at LIKE '%" + req.body.search + "%' )" +
        "AND YEAR(b.created_at) = YEAR(CURRENT_DATE()) AND MONTH(b.created_at) = MONTH(CURRENT_DATE()) " +
        "AND b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
        "ORDER BY b.id DESC LIMIT 10", [true]);

        if (binnacleDB.length > 0) {
            return res.status(200).json(binnacleDB);
        }

        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    }

}

const reportController = new ReportController();
export default reportController;