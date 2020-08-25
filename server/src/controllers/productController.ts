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
        const product = await db.query("SELECT * FROM products WHERE " +
        "(code LIKE '%" + req.body.search + "%' OR fullname LIKE '%" + req.body.search + "%') ");

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
        const serviceC = await db.query('SELECT * FROM client_services WHERE id_Client = ? AND state = ? ORDER BY code LIMIT 10', [id, true]);
        if (serviceC.length > 0) {
            return res.json(serviceC);
        }
        return res.status(401).json({ errors: [{ "msg": "Este cliente no tiene servicios asociados." }] });
    }

    public async addServices (req: Request, res: Response) {
        const { id } = req.params;  
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
                res.status(401).json({ errors: [{ "msg": "El cliente ya cuenta con este servicio." }] });
            }
            
        }
        

        if (servClient.length == 0) {
            await db.query('INSERT INTO client_services set ?', [service]); 
            res.json("Redirect");
        }
        
    
    }

    public async searchService (req: Request, res: Response) {
        const id_Client = req.body.id;

        const product = await db.query("SELECT * FROM client_services WHERE " +
        "(code LIKE '%" + req.body.search + "%' OR fullname LIKE '%" + req.body.search + "%') " +
        "AND id_Client = ? AND state = ? ORDER BY code LIMIT 10", [id_Client, true]);

        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async deleteService (req: Request, res: Response): Promise<void> {
        const service: Service = req.body;        
        await db.query('DELETE FROM client_services WHERE id_Client = ? AND id_Product = ?', [service.id_Client, service.id_Product]);
        res.status(200).json({ errors: [{"msg": "El servicio fue eliminado del archivo del cliente."}]});
    }
    
}

const productController = new ProductController();
export default productController;