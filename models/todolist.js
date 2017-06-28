'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todolist = sequelize.define('Todolist', {
    todo: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todolist;
};