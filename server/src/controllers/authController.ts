import { Request, Response } from 'express';

export class AuthController {
    

    public async signup (req: Request, res: Response): Promise<void> {
        res.send('signup');
    } 

    public async signin (req: Request, res: Response) {
        res.send('signin');
    } 

    public async profile(req: Request, res: Response) {
        res.send('profile');
    };
    
}

const authController = new AuthController();
export default authController;