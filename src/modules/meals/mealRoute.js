import express from 'express';
import mealController from '../meals/mealController.js';
import { protect, restrictTo } from '../users/userMiddleware.js';
import { validateExistMeal } from './mealMiddleware.js';
import { validateExistRestaurant } from '../restaurants/restaurantMiddleware.js';

export const router = express.Router();

//unprotected routes
router.route('/').get(mealController.findAllMeal);
router.route('/:id').get(validateExistMeal, mealController.findOneMeal);

//protected routes
router.use(protect);

//create a meal if there is a related restaurant
router
  .route('/:restaurantId')
  .post(
    restrictTo('admin'),
    validateExistRestaurant,
    mealController.createMeal
  );
router
  .route('/:id')
  //update a meal if it is active in db
  .patch(restrictTo('admin'), validateExistMeal, mealController.updateMeal)
  // delete a meal if it is active in db
  .delete(restrictTo('admin'), validateExistMeal, mealController.deleteMeal);
