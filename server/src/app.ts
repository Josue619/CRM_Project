import express, { Application } from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth';

const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/auth', authRoutes);


export default app;