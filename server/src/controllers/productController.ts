import { Request, Response } from 'express';
import db from '../database';
import { Service } from '../models/Service';
import { Product } from 'models/Product';

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

    public async addServices (req: Request, res: Response) {
        const { id } = req.params;  
        const servClass = new Service();
        const service: Service = req.body;
        const serv: any[] = [];
        
        const servClient = await db.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ?', [id, true]);
        
        if (servClient.length > 0) {

            for (let i = 0; i < servClient.length; i++) {
                serv.push(servClient[i].id_Product);
            }
            if (!serv.includes(service.id_Product)) {
                await db.query('INSERT INTO client_services set ?', [service]); 
                res.json("Redirect");
            }else {
                res.status(401).json({ errors: [{ "msg": "The client already has the selected service" }] });
            }
            
        }
        

        if (servClient.length == 0) {
            await db.query('INSERT INTO client_services set ?', [service]); 
            res.json("Redirect");
        }
        
    
    }

    public async searchService (req: Request, res: Response) {

        const product = await db.query('SELECT * FROM client_services WHERE fullname' + " like '%" + req.body.search + "%' AND id_Client = ? AND state = ?", [req.body.id, true]);
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