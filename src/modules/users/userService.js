import { User } from './userModel.js';
import { Order } from '../orders/orderModel.js';
import { Meal } from '../meals/mealModel.js';
import { Restaurant } from '../restaurants/restaurantModel.js';

export class UserService {
  static async findAllOrders() {
    return await Order.findAll({
      where: {
        status: 'active',
      },
      include: {
        model: Meal,
        attributes: ['name'],
        include: { model: Restaurant, attributes: ['name'] },
      },
    });
  }

  static async signUpService(data) {
    return await User.create(data);
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        email: email,
        status: true,
      },
    });
  }

  static async findOneUser(id) {
    return await User.findOne({
      where: { id: id, status: true },
    });
  }

  static async findOneOrder(id) {
    return await Order.findOne({
      where: { id, status: 'active' },
    });
  }

  static async updateUser(user, data) {
    return await user.update(data);
  }

  static async deleteUser(user) {
    return await user.update({ status: false });
  }
}
