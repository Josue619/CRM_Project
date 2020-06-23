import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import productController from '../controllers/productController';

const router: Router = Router();

router.get('/products', TokenValidation, productController.getProducts);
router.post('/serarch', TokenValidation, productController.searchProduct);

export default router;