import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const MealSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    })
    .min(3)
    .max(20),
  price: z.number(),
});

export function validateMeal(data) {
  const result = MealSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return { hasError, errorMessages, mealData };
}

export function validatePartialMeal(data) {
  const result = MealSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    mealData,
  };
}
