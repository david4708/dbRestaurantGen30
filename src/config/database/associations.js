import { Meal } from "../../modules/meals/mealModel.js"
import { Order } from "../../modules/orders/orderModel.js"
import { Restaurant } from "../../modules/restaurants/restaurantModel.js"
import { Review } from "../../modules/restaurants/reviewModel.js"
import { User } from "../../modules/users/userModel.js"



export const initModel=()=>{
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(User)
Meal.hasOne(Order)
Order.belongsTo(Meal)
Restaurant.hasMany(Meal)
Meal.belongsTo(Restaurant)
Restaurant.hasMany(Review)
Review.belongsTo(Restaurant)


}