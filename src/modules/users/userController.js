//import userService from './userService.js';

import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateLogin, validateUser } from './userSchema.js';
import { UserService } from './userService.js';
import { generateJWT } from '../../config/plugins/generateJWTpluging.js';
import { AppError } from '../../common/errors/appError.js';
import { verifyPassword } from '../../config/plugins/encriptedPasswordPluging.js';
import { restaurantService } from '../restaurants/restaurantService.js';

const signUp = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await UserService.signUpService(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
});
const login = catchAsync(async (req, res, next) => {
  //1. traer los datos de la req.body y validarlos
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  //2. validar q el usuario exista en la base de datos
  const user = await UserService.findOneByEmail(userData.email);
  if (!user) {
    return next(new AppError('this account does not exist', 404));
  }

  //3. comparar y comprobar contraseñas
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('incorrect email o password', 401));
  }
  //4. generar el jwt
  const token = await generateJWT(user.id);

  //5. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const findAllOrders = catchAsync(async (req, res, next) => {
  const restaurant = await restaurantService.findAllOrders();

  return res.status(200).json(restaurant);
});

const findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await UserService.findOneOrder(id);

  return res.status(200).json(order);
});
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userUpdated = await UserService.updateUser(user, userData);

  return res.status(200).json(userUpdated);
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  await UserService.deleteUser(user);
  return res.status(200).json({
    status: 'success',
    message: `user id: ${id} deleted`,
  });
});

export default {
  signUp,
  login,
  findAllOrders,
  findOneOrder,
  updateUser,
  deleteUser,
};
