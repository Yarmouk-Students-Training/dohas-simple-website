'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
       // define association here
      this.belongsToMany(user, {through: friend})
      //this.belongsToMany(friend, {through: friend})
       
     
      
    }
    toJSON(){ 
      return { ...this.get(), Friend_ID: undefined ,User_ID: undefined}
    
    } 
  };
  friend.init({
    Friend_ID: {type:DataTypes.INTEGER,
      allowNull:false,
      unique:true,
      primaryKey:true,
    },
    status: {type:DataTypes.STRING,
      allowNull:false,
    },
    action_users_id: {type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'friend',
    modelName: 'friend',
  });
  return friend;
};