import { Router } from 'express';
import { User } from '../models/User';
import { check } from "express-validator";
import { UserValidation } from '../libs/verifyUser';
import authController from '../controllers/authController';

const router: Router = Router();
const user: User = new User();

router.post('/signup', 
[
    check('email').isEmail().withMessage('Formato de correo electrónico incorrecto').custom(async email => {
      if (await user.verifyEmail(email)) {
        throw new Error('El correo electrónico ya existe en el registro.')
      }
    }),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe contener 8 caracteres')
  ], 
    UserValidation, authController.signup
);

router.post('/signin', authController.signin);

/** ------------------------------------------------- WEB Client ---------------------------------------------------- */

router.post('/login', authController.login);

export default router;