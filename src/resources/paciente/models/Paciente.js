const sequelize = require("../../../db/connect");
const { DataTypes } = require("sequelize");

const Paciente = sequelize.define(
  "pacientes",
  {
    idPaciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Paciente;
