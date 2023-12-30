import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from '../../config/database/database.js';


export const Review=sequelize.define('reviews',{

id:{
    autoIncrement:true, 
    primaryKey:true,
    type:DataTypes.INTEGER,
    allowNull:false,

},
userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
field:'user_id'

},
comment:{
    type:DataTypes.STRING,
    allowNull:false,
},
restaurantId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    field:'restaurant_id'
    },
    

rating:{
    type:DataTypes.INTEGER,
    allowNull:true,

},
status:{
    type:DataTypes.ENUM('active','deleted'),
    allowNull:false,
    defaultValue:true
}



})