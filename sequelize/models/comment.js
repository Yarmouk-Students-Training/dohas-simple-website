'use strict';
const { Model} = require('sequelize');
const friend = require('./friend');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ post, }) {
      // define association here
      this.belongsTo(post)
      
    }
    toJSON(){ 
      return { ...this.get(), C_ID: undefined}
    
    } 
  };
  comment.init({
    Comment_ID: {type:DataTypes.INTEGER,
      allowNull:false,
      unique:true,
      primaryKey:true,
    },
    comment_content: {type:DataTypes.STRING,
      allowNull:false,
  }, 
},
    {
    sequelize,
    tableName:'comment',
    modelName: 'comment',
  });
  return comment;
};