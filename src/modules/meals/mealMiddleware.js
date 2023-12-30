import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { restaurantService } from '../restaurants/restaurantService.js';
import { mealService } from './mealService.js';

//function to control if a meal exists
export const validateExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await mealService.findOneMeal(id);

  if (!meal) {
    return next(
      new AppError(`meal with id: ${id} not found or not is active`, 404)
    );
  }
  req.meal = meal;
  req.restaurant = meal.restaurant;
  const { restaurantId } = req.meal;
  const restaurant = await restaurantService.findOneRestaurant(restaurantId);
  if (!restaurant) {
    return next(
      new AppError(
        `restaurant with id: ${restaurantId} associated to  meal with id:${id}, is not active`,
        404
      )
    );
  }

  next();
});

//function to control if a meal exists and this has a related restaurant
export const validateExistMealByOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await mealService.findOneMeal(mealId);
  if (!meal) {
    return next(
      new AppError(`meal with id: ${mealId} is not active or not exist`, 404)
    );
  }
  req.meal = meal;

  const { restaurantId } = req.meal;
  const restaurant = await restaurantService.findOneRestaurant(restaurantId);

  if (!restaurant) {
    return next(
      new AppError(
        `restaurant with id: ${restaurantId} associated to  meal with id:${meal.id}, is not active`,
        404
      )
    );
  }
  req.order = meal.order;
  req.restaurant = restaurant;
  req.user = meal.user;
  next();
});
