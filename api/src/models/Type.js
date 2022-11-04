const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("type", {
    // id: {
    //   primaryKey: true,
    //   type: DataTypes.INTEGER, //*'If you don't define a primaryKey then sequelize uses id by default.'
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
