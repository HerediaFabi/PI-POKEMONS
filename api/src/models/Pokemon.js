const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "unknown",
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/189/189665.png",
    },
    hp: { type: DataTypes.INTEGER, defaultValue: 0 },
    attack: { type: DataTypes.INTEGER, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, defaultValue: 0 },
    height: { type: DataTypes.INTEGER, defaultValue: 0 },
    weight: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
};
