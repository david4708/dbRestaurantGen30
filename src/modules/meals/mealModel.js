
import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from '../../config/database/database.js';

export const Meal=sequelize.define('meals',{

id:{
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER,
    allowNull:false,

},
name:{
    type:DataTypes.STRING,
    allowNull:false,


},
price:{
    type:DataTypes.FLOAT,
    allowNull:false,
},
restaurantId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    field:'restaurant_id'

},
status:{
type:DataTypes.ENUM('active','inactive'),
allowNull:false,
defaultValue:'active'
}


})