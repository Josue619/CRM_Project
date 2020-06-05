import { Router } from 'express';
import { User } from '../models/User';
import { check } from "express-validator";
import { UserValidation } from '../libs/verifyUser';
import { TokenValidation } from '../libs/verifyToken';
import userController from '../controllers/userController';

const router: Router = Router();
const user: User = new User();

router.post('/client', 
[
    check('email').isEmail().withMessage('Wrong email format').custom(async email => {
      if (await user.verifyEmail(email)) {
        throw new Error('Email already registered')
      }
    })
  ], 
    UserValidation, TokenValidation, userController.createClient
);

router.get('/clients', TokenValidation, userController.getClients);

router.post('/serarchClient', TokenValidation, userController.searchClients);

router.get('/client/:id', TokenValidation, userController.getOne);

router.put('/clients/:id', 
[ 
  check('email').isEmail().withMessage('Wrong email format')
],
UserValidation, TokenValidation, userController.updateClient);

router.put('/client/:id', TokenValidation, userController.deleteClient);

export default router;