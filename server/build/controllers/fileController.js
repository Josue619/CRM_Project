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
            const product = yield database_1.default.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%'");
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
}
exports.FileController = FileController;
const fileController = new FileController();
exports.default = fileController;
//# sourceMappingURL=fileController.js.map