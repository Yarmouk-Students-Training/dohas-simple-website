'use strict';
const { Model} = require('sequelize');
const friend = require('./friend');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post,  friend, comment,reaction}) {
      // define association here
      this.hasMany(post)
      this.belongsToMany(this, {through: friend , as : 'User' , foreignKey:'Friend'  })
      this.hasMany(comment)
      this.hasMany(reaction)

         }
    toJSON(){ 
      return { ...this.get(), User_ID: undefined  }
    
    }
  };
 
  user.init(
    { User_ID:{
      type:DataTypes.INTEGER,
      allowNull:false,
      unique:true,
      primaryKey:true,
    },

    email  : {type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail:true ,
        notEmpty:true,

      }

    },
    gender : {type:DataTypes.STRING,
      allowNull:false,
    },
    user_name : {type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    password :{type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        len: [8, 15]
      }

    },
  }, 
  {
    sequelize,
    tableName:'user',
    modelName: 'user',
  });
  return user;
};