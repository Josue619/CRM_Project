import db from '../database';
import { Request, Response } from 'express';

import { Planner } from 'models/Planner';

export class PlannerController {

    /** ------------------------------------------------- Planner ---------------------------------------------------- */

    public async getEvents(req: Request, res: Response) {
        const { id } = req.params;

        const planner = await db.query('SELECT * FROM planner WHERE id_User = ?', [id]);
        if (planner.length > 0) {
            return res.json(planner);
        }
        return res.status(401).json({ errors: [{ "msg": "El usuario no tiene eventos registrados." }] });
    }

    public async addEvent(req: Request, res: Response) {
        const event: Planner = req.body;
        delete event.startDate;
        delete event.endDate;

        var msg: string = '';

        if (event.title == '') msg = 'Debe agregar un título al evento.';

        if (event.description == '') msg = 'Debe agregar una descripción al evento';

        if (msg == '') {
            await db.query('INSERT INTO planner set ?', [event]);
            return res.json("Redirect");
        }

        return res.status(401).json({ errors: [{ "msg": msg }] });
    }

    public async editEvent(req: Request, res: Response) {
        const { id } = req.params;
        const event: Planner = req.body;
        delete event.startDate;
        delete event.endDate;

        var msg: string = '';

        if (event.title == '') msg = 'Debe agregar un título al evento.';

        if (event.description == '') msg = 'Debe agregar una descripción al evento.';

        if (msg == '') {
            await db.query('UPDATE planner set ? WHERE id = ? AND id_User = ?', [event, id, event.id_User]);
            return res.json("Redirect");
        }

        return res.status(401).json({ errors: [{ "msg": msg }] });
    }

    public async deleteEvent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const event: Planner = req.body;

        await db.query('DELETE FROM planner WHERE id = ? AND id_User = ?', [id, event.id_User]);
        res.status(200).json({ errors: [{ "msg": "El evento fue eliminado del registro del usuario." }] });
    }

}

const plannerController = new PlannerController();
export default plannerController;