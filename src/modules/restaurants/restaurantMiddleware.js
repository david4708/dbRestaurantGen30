import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { restaurantService } from './restaurantService.js';

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await restaurantService.findOneRestaurant(restaurantId);

  if (!restaurant) {
    return next(
      new AppError(
        `restaurant with id: ${restaurantId} not found or not is active`,
        404
      )
    );
  }

  req.restaurant = restaurant;
  next();
});

export const validateExistReview = catchAsync(async (req, res, next) => {
  const { reviewid } = req.params;

  const review = await restaurantService.findOneReview(reviewid);

  if (!review) {
    return next(new AppError('Review not found or not is active', 404));
  }
  req.review = review;
  req.user = review.user;

  const { restaurantId } = req.params;

  if (review.restaurantId != restaurantId) {
    return next(
      new AppError(
        `restaurant with id: ${restaurantId} is not associated to review with id:${reviewid}`,
        404
      )
    );
  }

  const restaurant = await restaurantService.findOneRestaurant(restaurantId);

  if (!restaurant) {
    return next(new AppError('restaurant not found or not is active', 404));
  }

  req.restaurant = restaurant;

  next();
});
