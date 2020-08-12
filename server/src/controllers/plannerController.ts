import db from '../database';
import { Request, Response } from 'express';

import { Planner } from 'models/Planner';

export class PlannerController {

    /** ------------------------------------------------- Planner ---------------------------------------------------- */

    public async getEvents (req: Request, res: Response) {
        const { id } = req.params;   
        const planner = await db.query('SELECT * FROM planner WHERE id_User = ?', [id]);
        if (planner.length > 0) {
            console.log(planner);
            return res.json(planner);
        }
        return res.status(401).json({ errors: [{ "msg": "The user does not have registered events" }] });
    }

    public async addEvent(req: Request, res: Response) {
        const event: Planner = req.body;
        delete event.startDate;
        delete event.endDate;

        console.log(event);
        

        var msg: string = '';

        if (event.title == '') msg = 'You must add a title to the event';

        if (event.description == '') msg = 'You must add a description to the event';

        if (msg == '') {
            await db.query('INSERT INTO planner set ?', [event]); 
            return res.json("Redirect");
        }

        return res.status(401).json({ errors: [{ "msg": msg }] }); 

        //return res.json("Redirect");
    }

}

const plannerController = new PlannerController();
export default plannerController;