const { request, response } = require("express");
const { Op } = require("sequelize");
const Paciente = require("../../paciente/models/Paciente");

const searchPacientes = async (req = request, res = response) => {
  try {
    const { termino = "all" } = req.params;

    let pacientes;

    if (termino === "all") {
      pacientes = await Paciente.findAll();
    } else {
      pacientes = await Paciente.findAll({
        where: {
          nombre: {
            [Op.substring]: termino,
          },
        },
      });
    }

    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error en el servidor",
    });
  }
};

module.exports = {
  searchPacientes,
};
