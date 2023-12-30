import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { mealService } from '../meals/mealService.js';
import { restaurantService } from '../restaurants/restaurantService.js';
import { OrderService } from './orderService.js';

export const validateExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await OrderService.findOneOrder(id);

  if (!order) {
    return next(
      new AppError(`order with id: ${id} not found or not is active`, 404)
    );
  }

  req.order = order;

  const { mealId } = req.order;

  const meal = await mealService.findOneMeal(mealId);
  if (!meal) {
    return next(
      new AppError(`meal with id: ${mealId} is not active or not exist`, 404)
    );
  }
  req.meal = meal;
  req.restaurant = meal.restaurant;
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

  req.restaurant = restaurant;

  next();
});

export const protectOrderAccountOwner = (req, res, next) => {
  const { sessionUser, order } = req;

  if (order.userId !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }

  next();
};
