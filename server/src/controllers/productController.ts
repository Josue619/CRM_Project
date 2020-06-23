import { Request, Response } from 'express';
import db from '../database';

export class ProductController {

    public async getProducts (req: Request, res: Response) {
        const product = await db.query('SELECT * FROM products LIMIT 10');
        res.status(200).json(product);
    } 

    public async searchProduct (req: Request, res: Response) {
        const product = await db.query('SELECT * FROM products WHERE fullname' + " like '%" + req.body.search + "%'");
        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    } 
    
}

const productController = new ProductController();
export default productController;