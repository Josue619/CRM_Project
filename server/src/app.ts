import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import fileRoutes from './routes/fileRoutes';
import plannerRoutes from './routes/plannerRoutes';
import productRoutes from './routes/productRoutes';
import binnacleRoutes from './routes/binnacleRoutes';

class Server {

    public app: Application;

    constructor () {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/file', fileRoutes);
        this.app.use('/api/planner', plannerRoutes);
        this.app.use('/api/product', productRoutes);
        this.app.use('/api/binnacle', binnacleRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
export default server;