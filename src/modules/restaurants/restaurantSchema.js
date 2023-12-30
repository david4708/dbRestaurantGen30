import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';
export const restaurantSchema = z.object({
  name: z.string().min(3).max(60),
  address: z.string(),
  rating: z.number().min(1).max(5),
});

export const reviewSchema = z.object({
  comment: z.string().min(3).max(60),
  rating: z.number(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(3).max(60),
  address: z.string(),
});

/* export const updateReviewSchema = z.object({
  comment:z.string().min(3).max(60),
  rating:z.number(),

}); */

export function validateRestaurant(data) {
  const result = restaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}
export function validateReview(data) {
  const result = reviewSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    reviewData,
  };
}

export function validatePartialRestaurant(data) {
  const result = updateRestaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}

export function validatePartialReview(data) {
  const result = reviewSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    reviewData,
  };
}
