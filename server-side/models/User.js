import { DataTypes } from 'sequelize';
import db from '../db.js';

const User = db.define('User',{
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    about:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    profilePicture:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    
},
    db.sync({force:true})
)

export default User;


