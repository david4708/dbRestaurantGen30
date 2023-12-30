import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from '../../config/database/database.js';

 export const Restaurant=sequelize.define('restaurants',{

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
address:{
    type:DataTypes.STRING,
    allowNull:false,
},
rating:{
    type:DataTypes.INTEGER,
    allowNull:true,

},

status:{
type:DataTypes.ENUM('active','inactive'),
allowNull:false,
defaultValue:'active'
}


})

