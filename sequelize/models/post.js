'use strict';
const { Model} = require('sequelize');
const reaction = require('./reaction');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,comment,reaction}) {
      // define association here
      this.belongsTo(user, {foreignKey:"userId"} )
      this.hasMany(comment)
      this.hasMany(reaction)

    }
    toJSON(){ 
      return { ...this.get(), P_ID: undefined , U_ID: undefined }
    
    } 
  };
  post.init({
    Post_ID: {type:DataTypes.INTEGER,
      allowNull:false,
      unique: true,
      primaryKey: true
    },
    content:{type:DataTypes.STRING,
      allowNull:false,
  },
  }, {
    sequelize,
    tableName:'post',
    modelName: 'post',
  });
  return post;
};