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
    }
    toJSON(){ 
      return { ...this.get(), Friend_ID: undefined }
    
    } 
  };
  friend.init({
     Friend_ID: {
       type:DataTypes.INTEGER,
       allowNull:false,
    },
     User:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'friend',
    modelName: 'friend',
  });
  return friend;
};