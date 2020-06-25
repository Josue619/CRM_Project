"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const productController_1 = __importDefault(require("../controllers/productController"));
const router = express_1.Router();
router.get('/products', verifyToken_1.TokenValidation, productController_1.default.getProducts);
router.get('/services/:id', verifyToken_1.TokenValidation, productController_1.default.getClientServices);
router.post('/services', verifyToken_1.TokenValidation, productController_1.default.addServices);
router.post('/serarch', verifyToken_1.TokenValidation, productController_1.default.searchProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map