const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Tasks = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  reworkedByAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  body: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  Tasks,
};
