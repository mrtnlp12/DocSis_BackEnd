const sequelize = require("../../../db/connect");
const { DataTypes } = require("sequelize");

const Cita = sequelize.define(
  "citas",
  {
    idCita: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sintomas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Cita;
