import express from 'express';
import { validateExistOrder } from '../orders/orderMiddleware.js';

import userController from './userController.js';
import {
  protect,
  protectAccountOwner,
  validateExistUser,
} from './userMiddleware.js';

export const router = express.Router();

router
  //unprotected routes
  .post('/signUp', userController.signUp)

  .post('/login', userController.login);

//protected routes
router.use(protect);

router
  .get('/orders', userController.findAllOrders)

  .get('/orders/:id', validateExistOrder, userController.findOneOrder);

router
  .route('/:id')

  .patch(validateExistUser, protectAccountOwner, userController.updateUser)
  .delete(validateExistUser, protectAccountOwner, userController.deleteUser);
