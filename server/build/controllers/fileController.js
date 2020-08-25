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
            const request = yield database_1.default.query("SELECT * FROM requests WHERE id_Client = ? AND state = ? " +
                "ORDER BY id DESC", [id, true]);
            if (request.length > 0) {
                return res.json(request);
            }
            return res.status(401).json({ errors: [{ "msg": "El cliente no tiene consultas registradas." }] });
        });
    }
    getRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const request = yield database_1.default.query('SELECT * FROM requests WHERE id = ? AND state = ?', [id, true]);
            if (request.length > 0) {
                return res.json(request[0]);
            }
            return res.status(401).json({ errors: [{ "msg": "Ocurrió un problema al seleccionar la consulta" }] });
        });
    }
    addRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = req.body;
            var msg = '';
            const requestDB = yield database_1.default.query('SELECT * FROM requests WHERE id_Client = ? AND state = ?', [request.id_Client, true]);
            if (requestDB.length > 0) {
                for (let i = 0; i < requestDB.length; i++) {
                    if (request.query == requestDB[i].query) {
                        msg = 'Ya existe una consulta similar en preceso.';
                    }
                }
            }
            if (request.query == null || request.query == '')
                msg = 'Debe ingresar una consulta a enviar.';
            if (msg == '') {
                yield database_1.default.query('INSERT INTO requests set ?', [request]);
                return res.status(200).json("El envío de la consulta fue exitoso.");
            }
            return res.status(401).json({ errors: [{ "msg": msg }] });
        });
    }
    searchRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Client = req.body.id;
            const request = yield database_1.default.query("SELECT * FROM requests WHERE " +
                "(query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%' OR " +
                "created_at LIKE '%" + req.body.search + "%') AND id_Client = ? AND state = ? " +
                "ORDER BY id DESC LIMIT 10", [id_Client, true]);
            if (request.length > 0) {
                return res.status(200).json(request);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
                    }]
            });
        });
    }
    updateRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'La solicitud fue actualizada.' });
        });
    }
    deleteRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            req.body.state = false;
            yield database_1.default.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'La solicitud fue eliminada.' });
        });
    }
    /** ------------------------------------------------- Future Needs ---------------------------------------------------- */
    getNeedsClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const needC = yield database_1.default.query('SELECT * FROM future_needs WHERE id_Client = ? ORDER BY f_future_needs DESC LIMIT 10', [id]);
            if (needC.length > 0) {
                return res.json(needC);
            }
            return res.status(401).json({ errors: [{ "msg": "Este cliente no tiene necesidades futuras asociadas." }] });
        });
    }
    searchNeeds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Client = req.body.id;
            const needC = yield database_1.default.query("SELECT * FROM future_needs WHERE " +
                "(future_needs LIKE '%" + req.body.search + "%' OR f_future_needs LIKE '%" + req.body.search + "%') " +
                "AND id_Client = ? " +
                "ORDER BY f_future_needs DESC LIMIT 10", [id_Client]);
            if (needC.length > 0) {
                return res.status(200).json(needC);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
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
                        msg = 'Esta necesidad ya existe en el registro.';
                    }
                }
            }
            if (need.future_needs == null || need.future_needs == '' || need.f_future_needs == null)
                msg = 'Debe completar los campos solicitados.';
            if (dateN <= dateA)
                msg = 'La fecha debe ser mayor que la fecha actual.';
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
                msg = 'Debe completar los campos solicitados.';
            if (dateN <= dateA)
                msg = 'La fecha debe ser mayor que la fecha actual.';
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
            res.status(200).json({ errors: [{ "msg": "La necesidad fue eliminada del archivo del cliente." }] });
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
            return res.status(401).json({ errors: [{ "msg": "El cliente no tiene ningún soporte en el registro." }] });
        });
    }
    searchSuports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Client = req.body.id;
            const supportC = yield database_1.default.query("SELECT * FROM supports WHERE " +
                "(support LIKE '%" + req.body.search + "%' OR in_charge LIKE '%" + req.body.search + "%' OR " +
                "f_support LIKE '%" + req.body.search + "%') AND id_Client = ? " +
                "ORDER BY f_support DESC LIMIT 10", [id_Client]);
            if (supportC.length > 0) {
                return res.status(200).json(supportC);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
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
                        msg = 'Este soporte ya existe en el registro.';
                    }
                }
            }
            if (suport.support == null || suport.support == '' || suport.f_support == null || suport.in_charge == null || suport.in_charge == '')
                msg = 'Debe completar los campos solicitados.';
            if (dateS > dateA)
                msg = 'La fecha debe ser menor o igual a la fecha actual.';
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
                msg = 'Debe completar los campos solicitados.';
            if (dateS > dateA)
                msg = 'La fecha debe ser menor o igual a la fecha actual.';
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
            res.status(200).json({ errors: [{ "msg": "El detalle del soporte proporcionado se eliminó del archivo." }] });
        });
    }
    /** ------------------------------------------------- Notes ---------------------------------------------------- */
    searchNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_Client = req.body.id;
            const needC = yield database_1.default.query("SELECT * FROM notes WHERE " +
                "(title LIKE '%" + req.body.search + "%' OR created_at LIKE '%" + req.body.search + "%') " +
                "AND id_Client = ? AND completed = ? " +
                "ORDER BY created_at DESC", [id_Client, false]);
            if (needC.length > 0) {
                return res.status(200).json(needC);
            }
            return res.status(401).json({ errors: [{
                        "msg": "No hay coincidencia con la busqueda.",
                    }]
            });
        });
    }
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supportC = yield database_1.default.query('SELECT * FROM notes WHERE id_Client = ? ORDER BY created_at DESC', [id]);
            if (supportC.length > 0) {
                return res.json(supportC);
            }
            return res.status(401).json({ errors: [{ "msg": "El cliente no tiene notas en el registro." }] });
        });
    }
    getNotesC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supportC = yield database_1.default.query('SELECT * FROM notes WHERE id_Client = ? AND completed = ? ORDER BY created_at DESC', [id, false]);
            if (supportC.length > 0) {
                return res.json(supportC);
            }
            return res.status(401).json({ errors: [{ "msg": "El cliente no tiene notas en el registro." }] });
        });
    }
    addNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = req.body;
            if (note.title.trim().length == 0)
                res.status(401).json({ errors: [{ "msg": "Debe escribir el detalle de la nota." }] });
            yield database_1.default.query('INSERT INTO notes set ?', [note]);
            res.status(200).json({ errors: [{ "msg": "La notas se creo con éxito." }] });
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = req.body;
            yield database_1.default.query('UPDATE notes set ? WHERE id = ? AND id_Client = ?', [note, id, note.id_Client]);
            res.status(200).json({ errors: [{ "msg": "La nota fue actualizada." }] });
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = req.body;
            yield database_1.default.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [id, note.id_Client]);
            res.status(200).json({ errors: [{ "msg": "La nota se eliminó del archivo del cliente." }] });
        });
    }
    checkAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE notes set ? WHERE id_Client = ?', [req.body, id]);
            res.status(200).json({ errors: [{ "msg": "Las notas se actualizaron." }] });
        });
    }
    deleteCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const notes = req.body;
            for (let i = 0; i < notes.length; i++) {
                yield database_1.default.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [notes[i], id]);
            }
            res.status(200).json({ errors: [{ "msg": "Las notas marcadas se han eliminado." }] });
        });
    }
}
exports.FileController = FileController;
const fileController = new FileController();
exports.default = fileController;
//# sourceMappingURL=fileController.js.map