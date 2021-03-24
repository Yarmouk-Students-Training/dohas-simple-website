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
    static associate({ post,user }) {
      // define association here
      this.belongsTo(post)
      this.belongsTo(user)
                
    }
    toJSON(){ 
      return { ...this.get(), comment_ID: undefined}
    
    } 
  };
  comment.init({
    comment_ID: {type:DataTypes.INTEGER,
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