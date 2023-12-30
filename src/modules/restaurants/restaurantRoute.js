import express from 'express';

import restaurantController from '../restaurants/restaurantController.js';
import { protect, restrictTo } from '../users/userMiddleware.js';
import {
  validateExistRestaurant,
  validateExistReview,
} from './restaurantMiddleware.js';

export const router = express.Router();

//unprotected routes

router.get('/', restaurantController.findAllRestaurant);

router.get(
  '/:id',
  validateExistRestaurant,
  restaurantController.findOneRestaurant
);

//protected routes
router.use(protect);

router.post('/', restrictTo('admin'), restaurantController.createRestaurant);

//update a restauranrt if it is active in db
router.patch(
  '/:restaurantId',
  restrictTo('admin'),
  validateExistRestaurant,
  restaurantController.updateRestaurant
);
//delete a restaurant if this is active in db
router.delete(
  '/:restaurantId',
  restrictTo('admin'),
  validateExistRestaurant,
  restaurantController.deleteRestaurant
);

//create review if a restaurant exist
router.post(
  '/reviews/:restaurantId',
  restrictTo('admin'),
  validateExistRestaurant,
  restaurantController.createReview
);

router
  //update review if there is a related restaurant
  .route('/reviews/:restaurantId/:reviewid')
  .patch(
    restrictTo('admin'),
    validateExistReview,
    restaurantController.updateReview
  )
  //delete review if there is a related restaurant
  .delete(
    restrictTo('admin'),
    validateExistReview,

    restaurantController.deleteReview
  );
