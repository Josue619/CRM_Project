import { Request, Response } from 'express';
import db from '../database';
import { Need } from 'models/Need';
import { Support } from 'models/Support';
import { Note } from 'models/Note';


export class FileController {

    /** ------------------------------------------------- Request ---------------------------------------------------- */
    
    public async getRequests (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id_Client = ? AND state = ?', [id, true]);
        if (request.length > 0) {
            return res.json(request);
        }
        return res.status(401).json({ errors: [{ "msg": "This client has no queries" }] });
    }

    public async getRequest (req: Request, res: Response) {
        const { id } = req.params;   
        const request = await db.query('SELECT * FROM requests WHERE id = ? AND state = ?', [id, true]);
        if (request.length > 0) {
            return res.json(request[0]);
        }
        return res.status(401).json({ errors: [{ "msg": "A problem occurred while selecting the query" }] });
    }

    public async searchRequest(req: Request, res: Response) {
        const product = await db.query('SELECT * FROM requests WHERE query' + " like '%" + req.body.search + "%' AND state = ?", [true]);
        if (product.length > 0) {
            return res.status(200).json(product);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
            }]
        });
    }

    public async updateRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The request was updated'});
    }
    
    public async deleteRequest (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        req.body.state = false; 
        await db.query('UPDATE requests set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The request was deleted'});
    }

    /** ------------------------------------------------- Future Needs ---------------------------------------------------- */

    public async getNeedsClient (req: Request, res: Response) {
        const { id } = req.params;   
        const needC = await db.query('SELECT * FROM future_needs WHERE id_Client = ?', [id]);
        if (needC.length > 0) {
            return res.json(needC);
        }
        return res.status(401).json({ errors: [{ "msg": "This client does not have associated future needs" }] });
    }

    public async searchNeeds(req: Request, res: Response) {
        const needC = await db.query('SELECT * FROM future_needs WHERE future_needs' + " like '%" + req.body.search + "%'");
        if (needC.length > 0) {
            return res.status(200).json(needC);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
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
                    msg = 'This need already exists in the registry'
                }
                
            }
        }
        
        if (need.future_needs == null || need.future_needs == ''  || need.f_future_needs == null) msg = 'You must complete the requested fields';

        if (dateN <= dateA) msg = 'The date must be greater than the current date';

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
        
        if (need.future_needs == null || need.future_needs == '') msg = 'You must complete the requested fields';

        if (dateN <= dateA) msg = 'The date must be greater than the current date';

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
        res.status(200).json({ errors: [{"msg": "The need was removed from the client file"}]});
    }

    /** ------------------------------------------------- Supports ---------------------------------------------------- */

    public async getSupports (req: Request, res: Response) {
        const { id } = req.params;   
        const supportC = await db.query('SELECT * FROM supports WHERE id_Client = ? ORDER BY f_support LIMIT 10', [id]);
        if (supportC.length > 0) {
            return res.json(supportC);
        }
        return res.status(401).json({ errors: [{ "msg": "The client does not have any support in the registry" }] });
    }

    public async searchSuports (req: Request, res: Response) {
        const supportC = await db.query('SELECT * FROM supports WHERE support' + " like '%" + req.body.search + "%' ORDER BY f_support LIMIT 10");
        if (supportC.length > 0) {
            return res.status(200).json(supportC);
        }
        return res.status(401).json({ errors: [{
            "msg": "There is no match with the filter",
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
                    msg = 'This support already exists in the registry'
                }
                
            }
        }
        
        if (suport.support == null || suport.support == ''  || suport.f_support == null || suport.in_charge == null || suport.in_charge == '') msg = 'You must complete the requested fields';

        if (dateS > dateA) msg = 'The date must be less than or equal to the current date';

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
        
        if (suport.support == '' || suport.f_support == null || suport.in_charge == '') msg = 'You must complete the requested fields';

        if (dateS > dateA) msg = 'The date must be less than or equal to the current date';

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
        res.status(200).json({ errors: [{"msg": "The detail of the provided support was removed from the file"}]});
    }

    /** ------------------------------------------------- Notes ---------------------------------------------------- */

    public async getNotes (req: Request, res: Response) {
        const { id } = req.params;   
        const supportC = await db.query('SELECT * FROM notes WHERE id_Client = ?', [id]);
        if (supportC.length > 0) {
            return res.json(supportC);
        }
        return res.status(401).json({ errors: [{ "msg": "The client does not have any notes in the registry" }] });
    }

    public async addNote (req: Request, res: Response): Promise<void> {
        const note: Note = req.body;

        if (note.title.trim().length == 0) res.status(401).json({ errors: [{ "msg": "Writing the note detail required" }] });
        await db.query('INSERT INTO notes set ?', [note]);
        res.status(200).json({ errors: [{ "msg": "The notes was successfully created" }] });
    } 

    public async updateNote (req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        const note: Note = req.body;
        await db.query('UPDATE notes set ? WHERE id = ? AND id_Client = ?', [note, id, note.id_Client]);
        res.status(200).json({ errors: [{ "msg": "The note was updated" }] });
    }

    public async deleteNote (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const note: Note = req.body;  
        await db.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [id, note.id_Client]);
        res.status(200).json({ errors: [{"msg": "The note was removed from the client file"}]});
    }

    public async checkAll (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        await db.query('UPDATE notes set ? WHERE id_Client = ?', [req.body, id]);
        res.status(200).json({ errors: [{"msg": "The notes was updated"}]});
    }

    public async deleteCompleted (req: Request, res: Response): Promise<void> {
        const { id } = req.params;  
        const notes: [] = req.body;
        
        for (let i = 0; i < notes.length; i++) {            
            await db.query('DELETE FROM notes WHERE id = ? AND id_Client = ?', [notes[i], id]);          
        }
        res.status(200).json({ errors: [{"msg": "Marked notes have been removed"}]});
    }
    
}

const fileController = new FileController();
export default fileController;