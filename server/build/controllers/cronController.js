"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJob = void 0;
const database_1 = __importDefault(require("../database"));
const mailController_1 = __importDefault(require("./mailController"));
const moment_1 = __importDefault(require("moment"));
class CronJob {
    manageEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const planner = yield database_1.default.query('SELECT * FROM planner WHERE emailSent = ?', [false]);
            if (planner.length > 0) {
                for (let i = 0; i < planner.length; i++) {
                    const event = planner[i];
                    const id = planner[i].id;
                    let user = yield this.getEmailUser(event.id_User);
                    const eventD = moment_1.default(event.start).format('DD/MM/YYYY HH:mm');
                    const actD = moment_1.default(new Date()).format('DD/MM/YYYY HH:mm');
                    const eventH = moment_1.default(event.start);
                    const actH = moment_1.default(new Date());
                    var time = eventH.diff(actH, 'minutes');
                    if (eventD >= actD && time <= 30) {
                        console.log('Evento = ' + eventD + ' Actual = ' + actD);
                        yield this.editEvent(event, id);
                        mailController_1.default.sendMailEvent(user, event);
                    }
                }
            }
            //return res.status(401).json({ errors: [{ "msg": "The user does not have registered events" }] });
        });
    }
    getEmailUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.query('SELECT * FROM users WHERE id = ? AND state = ?', [id, true]);
            if (user.length > 0) {
                return user[0];
            }
            return null;
        });
    }
    editEvent(event, id) {
        return __awaiter(this, void 0, void 0, function* () {
            event.emailSent = true;
            yield database_1.default.query('UPDATE planner set ? WHERE id = ? AND id_User = ?', [event, id, event.id_User]);
        });
    }
}
exports.CronJob = CronJob;
const cj = new CronJob();
exports.default = cj;
//# sourceMappingURL=cronController.js.map