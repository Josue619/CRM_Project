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
exports.PlannerController = void 0;
const database_1 = __importDefault(require("../database"));
class PlannerController {
    /** ------------------------------------------------- Planner ---------------------------------------------------- */
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const planner = yield database_1.default.query('SELECT * FROM planner WHERE id_User = ?', [id]);
            if (planner.length > 0) {
                return res.json(planner);
            }
            return res.status(401).json({ errors: [{ "msg": "The user does not have registered events" }] });
        });
    }
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req.body;
            delete event.startDate;
            delete event.endDate;
            var msg = '';
            if (event.title == '')
                msg = 'You must add a title to the event';
            if (event.description == '')
                msg = 'You must add a description to the event';
            if (msg == '') {
                yield database_1.default.query('INSERT INTO planner set ?', [event]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    editEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const event = req.body;
            delete event.startDate;
            delete event.endDate;
            var msg = '';
            if (event.title == '')
                msg = 'You must add a title to the event';
            if (event.description == '')
                msg = 'You must add a description to the event';
            if (msg == '') {
                yield database_1.default.query('UPDATE planner set ? WHERE id = ? AND id_User = ?', [event, id, event.id_User]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const event = req.body;
            yield database_1.default.query('DELETE FROM planner WHERE id = ? AND id_User = ?', [id, event.id_User]);
            res.status(200).json({ errors: [{ "msg": "The event was removed from the registry" }] });
        });
    }
}
exports.PlannerController = PlannerController;
const plannerController = new PlannerController();
exports.default = plannerController;
//# sourceMappingURL=plannerController.js.map