import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMeal, validatePartialMeal } from './mealSchema.js';
import { mealService } from './mealService.js';

//controller or function to search all meals in db
const findAllMeal = catchAsync(async (req, res, next) => {
  const meals = await mealService.findAllMeal();
  return res.status(201).json(meals);
});
//controller or function to search one meal in db
const findOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealService.getfindOneMeal(id);
  return res.status(201).json(meal);
});

//controller or function to create one meal in db
const createMeal = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { sessionUser } = req;
  const { hasError, errorMessages, mealData } = validateMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const meal = await mealService.createMeal({
    userId: sessionUser.id,
    restaurantId,
    price: mealData.price,
    name: mealData.name,
    restaurantId,
  });

  return res.status(201).json(meal);
});

//controller or function to update one meal in db
const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { hasError, errorMessages, mealData } = validatePartialMeal(req.body);

  if (hasError) {
    return res.satus(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const mealUpdated = await mealService.updateMeal(meal, mealData);
  return res.status(201).json(mealUpdated);
});

//controller or function to delete one meal in db
const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { id } = req.params;
  await mealService.deleteMeal(meal);

  return res.status(200).json({
    message: `meal with id: ${id} has been inactived successfully!`,
  });
});
export default { findAllMeal, findOneMeal, createMeal, updateMeal, deleteMeal };
