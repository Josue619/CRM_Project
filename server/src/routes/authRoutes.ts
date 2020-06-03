import { Router } from 'express';
import { User } from '../models/User';
import { check } from "express-validator";
import { UserValidation } from '../libs/verifyUser';
import authController from '../controllers/authController';

const router: Router = Router();
const user: User = new User();

router.post('/signup', 
[
    check('email').isEmail().withMessage('Wrong email format').custom(async email => {
      if (await user.verifyEmail(email)) {
        throw new Error('Email already registered')
      }
    }),
    check('password').isLength({ min: 8 }).withMessage('The password must contain 8 characters')
  ], 
    UserValidation, authController.signup
);

router.post('/signin', authController.signin);

export default router;