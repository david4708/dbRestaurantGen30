import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const orderSchema = z.object({
  mealId: z.number(),
  quantity: z.number(),
});

/* export const orderUpdateSchema = z.object({
  status: z.enum(['active', 'cancelled', 'completed']),
}); */
export function validateOrder(data) {
  const result = orderSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: orderData,
  } = extractValidationData(result);

  return { hasError, errorMessages, orderData };
}

/* export function validatePartialOrder(data) {
  const result = orderUpdateSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: orderData,
  } = extractValidationData(result);
  return { hasError, errorMessages, orderData };
} */
