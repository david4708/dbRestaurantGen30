import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMeal } from '../meals/mealSchema.js';
import { mealService } from '../meals/mealService.js';
import { UserService } from '../users/userService.js';
import {
  validatePartialRestaurant,
  validatePartialReview,
  validateRestaurant,
  validateReview,
} from './restaurantSchema.js';
import { restaurantService } from './restaurantService.js';

const createRestaurant = catchAsync(async (req, res, next) => {
  /*   const dataBody = {
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating,
  }; */

  const { hasError, errorMessages, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const restaurant = await restaurantService.createRestaurant(restaurantData);

  return res.status(201).json({
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const { sessionUser } = req;
  const { hasError, errorMessages, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const review = await restaurantService.createReview({
    userId: sessionUser.id,
    comment: reviewData.comment,
    restaurantId,
    rating: reviewData.rating,
  });
  return res.status(201).json(review);
});

const findAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await restaurantService.findAllRestaurant();

  return res.status(200).json(restaurant);
});
const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json(restaurant);
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { hasError, errorMessages, restaurantData } = validatePartialRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const restaurantUpdated = await restaurantService.updateRestaurant(
    restaurant,
    restaurantData
  );

  return res.status(200).json({
    restaurantUpdated,
    message: 'restaurant has been updated successfully!',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { restaurantId } = req.params;
  await restaurantService.deleteRestaurant(restaurant);

  return res.status(200).json({
    message: `restaurant with id: ${restaurantId} has been inactived successfully!`,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const { hasError, errorMessages, reviewData } = validatePartialReview(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const reviewUpdated = await restaurantService.updateReview(
    review,
    reviewData
  );

  return res.status(200).json({
    reviewUpdated,
    message: 'review has been updated successfully!',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const reviewDeleted = await restaurantService.deleteReview(review);

  return res.status(202).json({
    reviewDeleted,
    message: 'review has been deleted successfully!',
  });
});

export default {
  createRestaurant,
  findAllRestaurant,
  findOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
