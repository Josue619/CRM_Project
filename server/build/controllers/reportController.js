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
exports.ReportController = void 0;
const database_1 = __importDefault(require("../database"));
class ReportController {
    /** ------------------------------------------------- Binnacle ---------------------------------------------------- */
    getBinnacles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const binnacleDB = yield database_1.default.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution, b.created_at " +
                "FROM binnacle AS b " +
                "INNER JOIN users AS u ON b.id_Client = u.id " +
                "INNER JOIN requests AS r ON b.id_Request = r.id " +
                "WHERE YEAR(b.created_at) = YEAR(CURRENT_DATE()) AND MONTH(b.created_at) = MONTH(CURRENT_DATE()) AND " +
                "b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
                "ORDER BY b.id DESC LIMIT 10", [true]);
            if (binnacleDB.length > 0) {
                return res.json(binnacleDB);
            }
            return res.status(401).json({ errors: [{ "msg": "No hay contenido en la bitácora." }] });
        });
    }
    searchBinnacles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const binnacleDB = yield database_1.default.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution, b.created_at " +
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
                        "msg": "No hay coincidencia con la busqueda.",
                    }]
            });
        });
    }
    /** ------------------------------------------------- Events Planner ---------------------------------------------------- */
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plannerDB = yield database_1.default.query("SELECT p.id, p.id_User, u.username, u.email, p.title, p.description, p.className, p.start, p.end " +
                "FROM planner AS p " +
                "INNER JOIN users AS u ON p.id_User = u.id " +
                "WHERE YEAR(p.start) = YEAR(CURRENT_DATE()) AND MONTH(p.start) = MONTH(CURRENT_DATE()) AND " +
                "p.id_User = u.id AND p.emailSent = ? " +
                "ORDER BY p.id DESC LIMIT 10", [true]);
            if (plannerDB.length > 0) {
                return res.json(plannerDB);
            }
            return res.status(401).json({ errors: [{ "msg": "No hay contenido en la bitácora." }] });
        });
    }
    searchEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plannerDB = yield database_1.default.query("SELECT p.id, p.id_User, u.username, u.email, p.title, p.description, p.className, p.start, p.end " +
                "FROM planner AS p " +
                "INNER JOIN users AS u ON p.id_User = u.id " +
                "WHERE (u.username LIKE '%" + req.body.search + "%' OR u.email LIKE '%" + req.body.search + "%' OR " +
                "p.title LIKE '%" + req.body.search + "%' OR p.description LIKE '%" + req.body.search + "%' OR " +
                "p.className LIKE '%" + req.body.search + "%' OR p.start LIKE '%" + req.body.search + "%' OR " +
                "p.end LIKE '%" + req.body.search + "%') " +
                "AND YEAR(p.start) = YEAR(CURRENT_DATE()) AND MONTH(p.start) = MONTH(CURRENT_DATE()) " +
                "AND p.id_User = u.id AND p.emailSent = ? " +
                "ORDER BY p.id DESC LIMIT 10", [true]);
            if (plannerDB.length > 0) {
                return res.status(200).json(plannerDB);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
                    }]
            });
        });
    }
}
exports.ReportController = ReportController;
const reportController = new ReportController();
exports.default = reportController;
//# sourceMappingURL=reportController.js.map