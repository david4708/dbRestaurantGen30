import { Restaurant } from '../restaurants/restaurantModel.js';
import { User } from '../users/userModel.js';
import { Review } from './reviewModel.js';

export class restaurantService {
  static async findOneRestaurant(id) {
    return await Restaurant.findOne({
      where: {
        status: 'active',
        id,
      },
    });
  }
  static async findAllRestaurant() {
    return await Restaurant.findAll({
      where: {
        status: 'active',
      },
    });
  }

  static async createRestaurant(data) {
    return await Restaurant.create(data);
  }
  static async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  static async createReview(data) {
    return await Review.create(data);
  }

  static async findOneReview(id) {
    return await Review.findOne({
      where: {
        id: id,
        status: true,
      },
      include: {
        model: User,
      },
    });
  }

  static async updateReview(review, data) {
    return await review.update(data);
  }
  static async deleteReview(review) {
    return await review.update({ status: false });
  }

  static async deleteRestaurant(restaurant) {
    return await restaurant.update({ status: 'inactive' });
  }
}
