'use strict';
const { post } = require('request');
const { comment } = require('request');
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => { 
   class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post ,user}) {
    // define association here
    this.belongsTo(post)
    this.belongsTo(user)
    
    
    
        }
    toJSON(){ 
      return { ...this.get(), reaction_ID: undefined }
    
    }   
  };
  reaction.init({ 
      reaction_ID:{type:DataTypes.INTEGER,
      allowNull:false,
      unique:true,
      primaryKey:true,
    },
    reaction_type:{type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'reaction',
    modelName: 'reaction',
  });
  return reaction;
};