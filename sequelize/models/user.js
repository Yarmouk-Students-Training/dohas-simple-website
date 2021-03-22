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
    static associate({post,  friend}) {
      // define association here
      this.hasMany(post)
      this.belongsToMany(friend, {through: friend})
         }
    toJSON(){ 
      return { ...this.get(), User_ID: undefined ,Friend_ID: undefined }
    
    }
  };
 
  user.init({ User_ID:{type:DataTypes.INTEGER,
    allowNull:false,
    unique:true,
  },

    email  : {type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    gender : {type:DataTypes.STRING,
      allowNull:true,
    },
    user_name : {type:DataTypes.STRING,
      allowNull:false,
    },
    password :{type:DataTypes.INTEGER,
      allowNull:false,
    },
  }, 
  {
    sequelize,
    tableName:'user',
    modelName: 'user',
  });
  return user;
};