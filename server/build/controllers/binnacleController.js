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
exports.BinnacleController = void 0;
const database_1 = __importDefault(require("../database"));
class BinnacleController {
    /** ------------------------------------------------- Binnacle ---------------------------------------------------- */
    addBinnacle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const binnacle = req.body;
            var msg = '';
            const binnacleDB = yield database_1.default.query('SELECT * FROM binnacle WHERE id_Client = ? AND id_Request', [binnacle.id_Client, binnacle.id_Request]);
            if (binnacleDB.length > 0) {
                for (let i = 0; i < binnacleDB.length; i++) {
                    if (binnacle.id_Client == binnacleDB[i].id_Client && binnacle.id_Request == binnacleDB[i].id_Request) {
                        msg = 'This query is already in the registry of the blog';
                    }
                }
            }
            if (msg == '') {
                yield database_1.default.query('INSERT INTO binnacle set ?', [binnacle]);
                return res.json("The information was added to the log successfully");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    getBinnacles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const binnacleDB = yield database_1.default.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution " +
                "FROM binnacle AS b " +
                "INNER JOIN users AS u ON b.id_Client = u.id " +
                "INNER JOIN requests AS r ON b.id_Request = r.id " +
                "WHERE b.id_Client = u.id AND b.id_Request = r.id AND b.state = ? " +
                "ORDER BY b.id DESC LIMIT 10", [true]);
            if (binnacleDB.length > 0) {
                return res.json(binnacleDB);
            }
            return res.status(401).json({ errors: [{ "msg": "There is no content in the blog." }] });
        });
    }
    searchBinnacles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const binnacleDB = yield database_1.default.query("SELECT b.id, b.id_Client, b.id_Request, u.username, u.email, u.card_id, u.code_phone, u.phone, r.query, r.solution " +
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
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    getRequestsCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const solution = 'No definida';
            const request = yield database_1.default.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution != ? ORDER BY id DESC LIMIT 10', [id, true, solution]);
            if (request.length > 0) {
                return res.json(request);
            }
            return res.status(401).json({ errors: [{ "msg": "This client has no answered queries." }] });
        });
    }
    searchRequestCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const solution = 'No definida';
            const request = yield database_1.default.query("SELECT * FROM requests WHERE (query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%') " +
                "AND id_Client = ? AND state = ? AND solution != ? ORDER BY id DESC LIMIT 10", [id, true, solution]);
            if (request.length > 0) {
                return res.status(200).json(request);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    getRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const solution = 'No definida';
            const request = yield database_1.default.query('SELECT * FROM requests WHERE id_Client = ? AND state = ? AND solution = ? ORDER BY id DESC LIMIT 10', [id, true, solution]);
            if (request.length > 0) {
                return res.json(request);
            }
            return res.status(401).json({ errors: [{ "msg": "This customer has no queries waiting." }] });
        });
    }
    searchRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const solution = 'No definida';
            const request = yield database_1.default.query("SELECT * FROM requests WHERE (query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%') " +
                "AND id_Client = ? AND state = ? AND solution = ? ORDER BY id DESC LIMIT 10", [id, true, solution]);
            if (request.length > 0) {
                return res.status(200).json(request);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    deleteBinnacle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const binnacle = req.body;
            yield database_1.default.query('UPDATE binnacle SET state = ? WHERE id = ? AND id_Client = ? AND id_Request = ?', [false, id, binnacle.id_Client, binnacle.id_Request]);
            res.status(200).json({ msg: 'The request was deleted' });
        });
    }
}
exports.BinnacleController = BinnacleController;
const binnacleController = new BinnacleController();
exports.default = binnacleController;
//# sourceMappingURL=binnacleController.js.map