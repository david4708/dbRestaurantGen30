import { Meal } from '../meals/mealModel.js';
import { Restaurant } from '../restaurants/restaurantModel.js';
import { Order } from './orderModel.js';

export class OrderService {
  static async findOrderSessionUser(sessionUser) {
    return await Order.findAll({
      where: {
        status: 'active',
        userId: sessionUser,
      },
      include: {
        model: Meal,
        attributes: ['name'],
        include: { model: Restaurant, attributes: ['name'] },
      },
    });
  }

  static async createOrder(data) {
    return await Order.create(data);
  }

  static async findOneOrder(id) {
    return await Order.findOne({
      where: { id: id, status: 'active' },
    });
  }

  static async updateOrder(order) {
    return await order.update({ status: 'completed' });
  }

  static async deleteOrder(order) {
    return await order.update({ status: 'cancelled' });
  }
}
