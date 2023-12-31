import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import productController from '../controllers/productController';

const router: Router = Router();

router.get('/products', TokenValidation, productController.getProducts);
router.get('/services/:id', TokenValidation, productController.getClientServices);
router.post('/services/:id', TokenValidation, productController.addServices);
router.post('/serarch', TokenValidation, productController.searchProduct);
router.post('/serarchS', TokenValidation, productController.searchService);
router.delete('/services', TokenValidation, productController.deleteService);

export default router;