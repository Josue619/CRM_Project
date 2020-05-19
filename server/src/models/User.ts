import db from '../database';
import bcrypt from 'bcryptjs';

export class User { 

    username: string = '';
    email: string = '';
    password: string = '';
    card_id: number = 0;
    code_phone: string = '';
    phone: number = 0;
    roll: string = '';
    state: boolean = true;
    
    constructor( ) { }

    public async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async validatedPassword(password: string, pass: string): Promise<boolean> {
        return await bcrypt.compare(password, pass);
    }

    public async verifyEmail(email: string): Promise<boolean> {
        let db_user: Array<User> = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (db_user.length > 0) return true;
        return false;
    }
  
}