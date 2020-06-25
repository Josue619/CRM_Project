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

    public async getClientServices (req: Request, res: Response) {
        const { id } = req.params;   
        const serviceC = await db.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ?', [id, true]);
        if (serviceC.length > 0) {
            return res.json(serviceC);
        }
        return res.status(401).json({ errors: [{ "msg": "This client does not have associated services" }] });
    }

    public async addServices (req: Request, res: Response): Promise<void> {
        const services: [] = req.body;
        for (let i = 0; i < services.length; i++) {
            console.log(services[i]);
            //res.status(401).json({ errors: [{ "msg": "This client does not have associated services" }] });
            //await db.query('DELETE FROM todos WHERE id = ?', [todos[i]]);          
        }
        res.json({message: 'The todo was deleted'});
    }
    
}

const productController = new ProductController();
export default productController;