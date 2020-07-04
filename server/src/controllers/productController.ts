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
        const product: Product[] = req.body;
        
        const serv: Service = new Service();
        const servClient = await db.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ?', [id, true]);   

        serv.test(id, product);

        //if (!services[0])  return res.status(401).json({ errors: [{ "msg": "You must select the services you want to add." }] });
        //for (let index = 0; index < services.length; index++) {
        //    
        //    if (servClient.length > 0) {
//
        //        for (let i = 0; index < servClient.length; i++) {
        //            
        //            if (services[i].id_Product != servClient[i].id_Product) {
        //                await db.query('INSERT INTO client_services set ?', [services[i]]); 
        //                return res.json('Redirect');
        //            }
        //            return res.status(401).json({ errors: [{ "msg": "This customer already owns some of these products" }] });   
        //        }
        //        
        //    }
        //    await db.query('INSERT INTO client_services set ?', [services[index]]);
        //    return res.json('Redirect');    
        //}
    
    }
    
}

const productController = new ProductController();
export default productController;