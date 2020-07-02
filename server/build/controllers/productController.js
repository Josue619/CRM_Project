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
exports.ProductController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield database_1.default.query('SELECT * FROM products LIMIT 10');
            res.status(200).json(product);
        });
    }
    searchProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield database_1.default.query('SELECT * FROM products WHERE fullname' + " like '%" + req.body.search + "%'");
            if (product.length > 0) {
                return res.status(200).json(product);
            }
            return res.status(401).json({ errors: [{
                        "msg": "There is no match with the filter",
                    }]
            });
        });
    }
    getClientServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const serviceC = yield database_1.default.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ?', [id, true]);
            if (serviceC.length > 0) {
                return res.json(serviceC);
            }
            return res.status(401).json({ errors: [{ "msg": "This client does not have associated services" }] });
        });
    }
    addServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const services = req.body;
            const servClient = yield database_1.default.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ?', [id, true]);
            for (let i = 0; i < services.length; i++) {
                if (servClient.length > 0) {
                    for (let j = 0; j < servClient.length; j++) {
                        if (services[i].id_Product != servClient[j].id_Product) {
                            yield database_1.default.query('INSERT INTO client_services set ?', [services[i]]);
                            return res.json('Redirect');
                        }
                        return res.status(401).json({ errors: [{ "msg": "This customer already owns some of these products" }] });
                    }
                }
                yield database_1.default.query('INSERT INTO client_services set ?', [services[i]]);
                return res.json('Redirect');
            }
        });
    }
}
exports.ProductController = ProductController;
const productController = new ProductController();
exports.default = productController;
//# sourceMappingURL=productController.js.map