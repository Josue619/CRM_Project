import db from '../database';
import { User } from 'models/User';
import { Planner } from 'models/Planner';
import mailController from './mailController';
import moment from 'moment';

export class CronJob {

    public async manageEvents() {

        const planner = await db.query('SELECT * FROM planner WHERE emailSent = ?', [false]);

        if (planner.length > 0) {
            for (let i = 0; i < planner.length; i++) {
                const event: Planner = planner[i];
                const id = planner[i].id;
                let user: User = await this.getEmailUser(event.id_User);
                const eventD = moment(event.start).format('DD/MM/YYYY HH:mm');
                const actD = moment(new Date()).format('DD/MM/YYYY HH:mm');

                const eventH = moment(event.start);
                const actH = moment(new Date());

                var time = eventH.diff(actH, 'minutes');

                if (eventD >= actD && time <= 30) {
                    console.log('Evento = ' + eventD + ' Actual = ' + actD);
                    await this.editEvent(event, id);
                    mailController.sendMailEvent(user, event);
                }

            }

        }


        //return res.status(401).json({ errors: [{ "msg": "The user does not have registered events" }] });
    }

    public async getEmailUser(id: string) {
        const user = await db.query('SELECT * FROM users WHERE id = ? AND state = ?', [id, true]);

        if (user.length > 0) {
            return user[0];
        }
        return null;
    }

    public async editEvent(event: Planner, id: string) {
        event.emailSent = true;
        await db.query('UPDATE planner set ? WHERE id = ? AND id_User = ?', [event, id, event.id_User]);
    }


}

const cj = new CronJob();
export default cj;