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
exports.FileController = void 0;
const database_1 = __importDefault(require("../database"));
class FileController {
    /** ------------------------------------------------- Request ---------------------------------------------------- */
    getRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const request = yield database_1.default.query('SELECT * FROM requests WHERE id_Client = ? AND state = ?', [id, true]);
            if (request.length > 0) {
                return res.json(request);
            }
            return res.status(401).json({ errors: [{ "msg": "This client has no queries" }] });
        });
    }
    getRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const request = yield database_1.default.query('SELECT * FROM requests WHERE id = ? AND state = ?', [id, true]);
            if (request.length > 0) {
                return res.json(request[0]);
            }
            return res.status(401).json({ errors: [{ "msg": "A problem occurred while selecting the query" }] });
        });
    }
    searchRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield database_1.default.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%' AND state = ?", [true]);
            if (product.length > 0) {
                return res.status(200).json(product);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    updateRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The request was updated' });
        });
    }
    deleteRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.body.state = false;
            yield database_1.default.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The request was deleted' });
        });
    }
    /** ------------------------------------------------- Future Needs ---------------------------------------------------- */
    getNeedsClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const needC = yield database_1.default.query('SELECT * FROM future_needs WHERE id_Client = ?', [id]);
            if (needC.length > 0) {
                return res.json(needC);
            }
            return res.status(401).json({ errors: [{ "msg": "This client does not have associated future needs" }] });
        });
    }
    searchNeeds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const needC = yield database_1.default.query('SELECT * FROM future_needs WHERE future_needs' + " like '%" + req.body.search + "%'");
            if (needC.length > 0) {
                return res.status(200).json(needC);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    addNeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const need = req.body;
            const dateA = new Date();
            const dateN = new Date(need.f_future_needs);
            var msg = '';
            const needC = yield database_1.default.query('SELECT * FROM future_needs WHERE id_Client = ?', [need.id_Client]);
            if (needC.length > 0) {
                for (let i = 0; i < needC.length; i++) {
                    if (need.future_needs == needC[i].future_needs) {
                        msg = 'This need already exists in the registry';
                    }
                }
            }
            if (need.future_needs == null || need.future_needs == '' || need.f_future_needs == null)
                msg = 'You must complete the requested fields';
            if (dateN <= dateA)
                msg = 'The date must be greater than the current date';
            if (msg == '') {
                yield database_1.default.query('INSERT INTO future_needs set ?', [need]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    updateNeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const need = req.body;
            const dateA = new Date();
            const dateN = new Date(need.f_future_needs);
            var msg = '';
            if (need.future_needs == null || need.future_needs == '')
                msg = 'You must complete the requested fields';
            if (dateN <= dateA)
                msg = 'The date must be greater than the current date';
            if (msg == '') {
                yield database_1.default.query('UPDATE future_needs set ? WHERE id = ? AND id_Client = ?', [need, id, need.id_Client]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    deleteNeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const need = req.body;
            yield database_1.default.query('DELETE FROM future_needs WHERE id = ? AND id_Client = ?', [id, need.id_Client]);
            res.status(200).json({ errors: [{ "msg": "The need was removed from the client file" }] });
        });
    }
    /** ------------------------------------------------- Supports ---------------------------------------------------- */
    getSupports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supportC = yield database_1.default.query('SELECT * FROM supports WHERE id_Client = ? ORDER BY f_support LIMIT 10', [id]);
            if (supportC.length > 0) {
                return res.json(supportC);
            }
            return res.status(401).json({ errors: [{ "msg": "The client does not have any support in the registry" }] });
        });
    }
    searchSuports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supportC = yield database_1.default.query('SELECT * FROM supports WHERE support' + " like '%" + req.body.search + "%' ORDER BY f_support LIMIT 10");
            if (supportC.length > 0) {
                return res.status(200).json(supportC);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    addSuport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const suport = req.body;
            const dateA = new Date();
            const dateS = new Date(suport.f_support);
            var msg = '';
            const supportC = yield database_1.default.query('SELECT * FROM supports WHERE id_Client = ?', [suport.id_Client]);
            if (supportC.length > 0) {
                for (let i = 0; i < supportC.length; i++) {
                    if (suport.support == supportC[i].support && suport.in_charge == supportC[i].in_charge) {
                        msg = 'This support already exists in the registry';
                    }
                }
            }
            if (suport.support == null || suport.support == '' || suport.f_support == null || suport.in_charge == null || suport.in_charge == '')
                msg = 'You must complete the requested fields';
            if (dateS > dateA)
                msg = 'The date must be less than or equal to the current date';
            if (msg == '') {
                yield database_1.default.query('INSERT INTO supports set ?', [suport]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    updateSuport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const suport = req.body;
            const dateA = new Date();
            const dateS = new Date(suport.f_support);
            var msg = '';
            if (suport.support == '' || suport.f_support == null || suport.in_charge == '')
                msg = 'You must complete the requested fields';
            if (dateS > dateA)
                msg = 'The date must be less than or equal to the current date';
            if (msg == '') {
                yield database_1.default.query('UPDATE supports set ? WHERE id = ? AND id_Client = ?', [suport, id, suport.id_Client]);
                return res.json("Redirect");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    deleteSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const support = req.body;
            yield database_1.default.query('DELETE FROM supports WHERE id = ? AND id_Client = ?', [id, support.id_Client]);
            res.status(200).json({ errors: [{ "msg": "The detail of the provided support was removed from the file" }] });
        });
    }
    /** ------------------------------------------------- Notes ---------------------------------------------------- */
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supportC = yield database_1.default.query('SELECT * FROM notes WHERE id_Client = ?', [id]);
            if (supportC.length > 0) {
                return res.json(supportC);
            }
            return res.status(401).json({ errors: [{ "msg": "The client does not have any notes in the registry" }] });
        });
    }
    addNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = req.body;
            if (note.title.trim().length == 0)
                res.status(401).json({ errors: [{ "msg": "Writing the note detail required" }] });
            yield database_1.default.query('INSERT INTO notes set ?', [note]);
            res.status(200).json({ errors: [{ "msg": "The notes was successfully created" }] });
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = req.body;
            yield database_1.default.query('UPDATE notes set ? WHERE id = ? AND id_Client = ?', [note, id, note.id_Client]);
            res.status(200).json({ errors: [{ "msg": "The note was updated" }] });
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = req.body;
            yield database_1.default.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [id, note.id_Client]);
            res.status(200).json({ errors: [{ "msg": "The note was removed from the client file" }] });
        });
    }
    checkAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE notes set ? WHERE id_Client = ?', [req.body, id]);
            res.status(200).json({ errors: [{ "msg": "The notes was updated" }] });
        });
    }
    deleteCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const notes = req.body;
            for (let i = 0; i < notes.length; i++) {
                yield database_1.default.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [notes[i], id]);
            }
            res.status(200).json({ errors: [{ "msg": "Marked notes have been removed" }] });
        });
    }
}
exports.FileController = FileController;
const fileController = new FileController();
exports.default = fileController;
//# sourceMappingURL=fileController.js.map