import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from '../../config/database/database.js';
import { encryptedPassword } from "../../config/plugins/encriptedPasswordPluging.js";

export const User=sequelize.define('users',{

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
email:{
    type:DataTypes.STRING,
    allowNull:false,
},
password:{
    type:DataTypes.STRING,
    allowNull:false,

},
role:{
    type:DataTypes.ENUM('normal','admin'),
    allowNull:false,
    defaultValue:'normal'
},
status:{
type:DataTypes.BOOLEAN,
allowNull:false,
defaultValue:true
}
},{
    hooks:{
        beforeCreate:async(user)=>{
            user.password=await encryptedPassword(user.password)
        }
    }
}

)
