import { Request, Response } from 'express';
import db from '../database';
import { Need } from 'models/Need';
import { Support } from 'models/Support';
import { Note } from 'models/Note';
import { RequestC } from 'models/Request';


export class FileController {

    /** ------------------------------------------------- Request ---------------------------------------------------- */
    
    public async getRequests (req: Request, res: Response) {  
        const { id } = req.params;   
        const request = await db.query("SELECT * FROM requests WHERE id_Client = ? AND state = ? " +
        "ORDER BY id DESC", [id, true]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no tiene consultas registradas." }] });
    }

    public async getRequest (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id = ? AND state = ?', [id, true]);
        if (request.length > 0) {
            return res.json(request[0]);
        }
        return res.status(401).json({ errors: [{ "msg": "Ocurrió un problema al seleccionar la consulta" }] });
    }

    public async addRequest(req: Request, res: Response) {
        const request: RequestC = req.body;
        var msg: string = '';

        const requestDB = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ?', [request.id_Client, true]);

        if (requestDB.length > 0) {
            for (let i = 0; i < requestDB.length; i++) {
                
                if (request.query == requestDB[i].query) {
                    msg = 'Ya existe una consulta similar en preceso.'
                }
                
            }
        }
        
        if (request.query == null || request.query  == '') msg = 'Debe ingresar una consulta a enviar.';


        if (msg == '') {
            await db.query('INSERT INTO requests set ?', [request]); 
            return res.status(200).json("El envío de la consulta fue exitoso.");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async searchRequest(req: Request, res: Response) {
        const id_Client = req.body.id;

        const request = await db.query("SELECT * FROM requests WHERE " +
        "(query LIKE '%" + req.body.search + "%' OR solution LIKE '%" + req.body.search + "%' OR " +
        "created_at LIKE '%" + req.body.search + "%') AND id_Client = ? AND state = ? " +
        "ORDER BY id DESC LIMIT 10", [id_Client, true]);

        if (request.length > 0) {
            return res.status(200).json(request);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async updateRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'La solicitud fue actualizada.'});
    }
    
    public async deleteRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        req.body.state = false; 
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'La solicitud fue eliminada.'});
    }

    /** ------------------------------------------------- Future Needs ---------------------------------------------------- */

    public async getNeedsClient (req: Request, res: Response) {
        const { id } = req.params;   
        const needC = await db.query('SELECT * FROM future_needs WHERE id_Client = ? ORDER BY f_future_needs DESC LIMIT 10', [id]);
        if (needC.length > 0) {
            return res.json(needC);
        }
        return res.status(401).json({ errors: [{ "msg": "Este cliente no tiene necesidades futuras asociadas." }] });
    }

    public async searchNeeds(req: Request, res: Response) {
        const id_Client = req.body.id;

        const needC = await db.query("SELECT * FROM future_needs WHERE " +
        "(future_needs LIKE '%" + req.body.search + "%' OR f_future_needs LIKE '%" + req.body.search + "%') " +
        "AND id_Client = ? " +
        "ORDER BY f_future_needs DESC LIMIT 10", [id_Client]);

        if (needC.length > 0) {
            return res.status(200).json(needC);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async addNeed(req: Request, res: Response) {
        const need: Need = req.body;
        const dateA = new Date();
        const dateN = new Date(need.f_future_needs);
        var msg: string = '';

        const needC = await db.query('SELECT * FROM future_needs WHERE id_Client = ?', [need.id_Client]);

        if (needC.length > 0) {
            for (let i = 0; i < needC.length; i++) {
                
                if (need.future_needs == needC[i].future_needs) {
                    msg = 'Esta necesidad ya existe en el registro.'
                }
                
            }
        }
        
        if (need.future_needs == null || need.future_needs == ''  || need.f_future_needs == null) msg = 'Debe completar los campos solicitados.';

        if (dateN <= dateA) msg = 'La fecha debe ser mayor que la fecha actual.';

        if (msg == '') {
            await db.query('INSERT INTO future_needs set ?', [need]); 
            return res.json("Redirect");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async updateNeed (req: Request, res: Response) {
        const { id } = req.params;  
        const need: Need = req.body;
        const dateA = new Date();
        const dateN = new Date(need.f_future_needs);
        var msg: string = '';
        
        if (need.future_needs == null || need.future_needs == '') msg = 'Debe completar los campos solicitados.';

        if (dateN <= dateA) msg = 'La fecha debe ser mayor que la fecha actual.';

        if (msg == '') {
            await db.query('UPDATE future_needs set ? WHERE id = ? AND id_Client = ?', [need, id, need.id_Client]);
            return res.json("Redirect");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] }); 

    }

    public async deleteNeed (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const need: Need = req.body;  
              
        await db.query('DELETE FROM future_needs WHERE id = ? AND id_Client = ?', [id, need.id_Client]);
        res.status(200).json({ errors: [{"msg": "La necesidad fue eliminada del archivo del cliente."}]});
    }

    /** ------------------------------------------------- Supports ---------------------------------------------------- */

    public async getSupports (req: Request, res: Response) {
        const { id } = req.params;   

        const supportC = await db.query('SELECT * FROM supports WHERE id_Client = ? ORDER BY f_support LIMIT 10', [id]);
        if (supportC.length > 0) {
            return res.json(supportC);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no tiene ningún soporte en el registro." }] });
    }

    public async searchSuports (req: Request, res: Response) {
        const id_Client = req.body.id;

        const supportC = await db.query("SELECT * FROM supports WHERE " +
        "(support LIKE '%" + req.body.search + "%' OR in_charge LIKE '%" + req.body.search + "%' OR " +
        "f_support LIKE '%" + req.body.search + "%') AND id_Client = ? " +
        "ORDER BY f_support DESC LIMIT 10", [id_Client]);
        
        if (supportC.length > 0) {
            return res.status(200).json(supportC);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async addSuport(req: Request, res: Response) {  
        const suport: Support = req.body;
        const dateA = new Date();
        const dateS = new Date(suport.f_support);
        var msg: string = '';

        const supportC = await db.query('SELECT * FROM supports WHERE id_Client = ?', [suport.id_Client]);

        if (supportC.length > 0) {
            for (let i = 0; i < supportC.length; i++) {
                
                if (suport.support == supportC[i].support && suport.in_charge == supportC[i].in_charge) {
                    msg = 'Este soporte ya existe en el registro.'
                }
                
            }
        }
        
        if (suport.support == null || suport.support == ''  || suport.f_support == null || suport.in_charge == null || suport.in_charge == '') msg = 'Debe completar los campos solicitados.';

        if (dateS > dateA) msg = 'La fecha debe ser menor o igual a la fecha actual.';

        if (msg == '') {
            await db.query('INSERT INTO supports set ?', [suport]); 
            return res.json("Redirect");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async updateSuport(req: Request, res: Response) {
        const { id } = req.params;  
        const suport: Support = req.body;
        const dateA = new Date();
        const dateS = new Date(suport.f_support);
        var msg: string = '';
        
        if (suport.support == '' || suport.f_support == null || suport.in_charge == '') msg = 'Debe completar los campos solicitados.';

        if (dateS > dateA) msg = 'La fecha debe ser menor o igual a la fecha actual.';

        if (msg == '') {

            await db.query('UPDATE supports set ? WHERE id = ? AND id_Client = ?', [suport, id, suport.id_Client]);
            return res.json("Redirect");
        }
        
        return res.status(401).json({ errors: [{ "msg": msg }] });  
    }

    public async deleteSupport (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const support: Support = req.body;  
              
        await db.query('DELETE FROM supports WHERE id = ? AND id_Client = ?', [id, support.id_Client]);
        res.status(200).json({ errors: [{"msg": "El detalle del soporte proporcionado se eliminó del archivo."}]});
    }

    /** ------------------------------------------------- Notes ---------------------------------------------------- */

    public async searchNotes(req: Request, res: Response) {
        const id_Client = req.body.id;

        const needC = await db.query("SELECT * FROM notes WHERE " +
        "(title LIKE '%" + req.body.search + "%' OR created_at LIKE '%" + req.body.search + "%') " +
        "AND id_Client = ? AND completed = ? " +
        "ORDER BY created_at DESC", [id_Client, false]);

        if (needC.length > 0) {
            return res.status(200).json(needC);
        }
        return res.status(401).json({ errors: [{
            "msg": "No hay coincidencia con la busqueda.",
            }]
        });
    }

    public async getNotes (req: Request, res: Response) {
        const { id } = req.params;   
        const supportC = await db.query('SELECT * FROM notes WHERE id_Client = ? ORDER BY created_at DESC', [id]);
        if (supportC.length > 0) {
            return res.json(supportC);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no tiene notas en el registro." }] });
    }

    public async getNotesC (req: Request, res: Response) {
        const { id } = req.params;   
        const supportC = await db.query('SELECT * FROM notes WHERE id_Client = ? AND completed = ? ORDER BY created_at DESC', [id, false]);
        if (supportC.length > 0) {
            return res.json(supportC);
        }
        return res.status(401).json({ errors: [{ "msg": "El cliente no tiene notas en el registro." }] });
    }

    public async addNote (req: Request, res: Response): Promise<void> {
        const note: Note = req.body;

        if (note.title.trim().length == 0) res.status(401).json({ errors: [{ "msg": "Debe escribir el detalle de la nota." }] });
        await db.query('INSERT INTO notes set ?', [note]);
        res.status(200).json({ errors: [{ "msg": "La notas se creo con éxito." }] });
    } 

    public async updateNote (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        const note: Note = req.body;
        await db.query('UPDATE notes set ? WHERE id = ? AND id_Client = ?', [note, id, note.id_Client]);
        res.status(200).json({ errors: [{ "msg": "La nota fue actualizada." }] });
    }

    public async deleteNote (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const note: Note = req.body;  
        await db.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [id, note.id_Client]);
        res.status(200).json({ errors: [{"msg": "La nota se eliminó del archivo del cliente."}]});
    }

    public async checkAll (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE notes set ? WHERE id_Client = ?', [req.body, id]);
        res.status(200).json({ errors: [{"msg": "Las notas se actualizaron."}]});
    }

    public async deleteCompleted (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const notes: [] = req.body;
        
        for (let i = 0; i < notes.length; i++) {            
            await db.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [notes[i], id]);          
        }
        res.status(200).json({ errors: [{"msg": "Las notas marcadas se han eliminado."}]});
    }
    
}

const fileController = new FileController();
export default fileController;