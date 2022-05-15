const { request, response } = require("express");
const Paciente = require("../models/Paciente");

const obtenerPacientes = async (req = request, res = response) => {
  try {
    let pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

const obtenerPaciente = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(400).json({
        message: `No se encontro ningub usuario con el id ${id}`,
      });
    }
    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

const actualizarPaciente = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, edad, correo, telefono } = req.body;
    let paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(400).json({
        message: "No se encontro el usuario con el id: " + id,
      });
    }

    paciente = await paciente.update({
      nombre,
      apellidos,
      correo,
      telefono,
      edad,
    });

    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

const elimininarPaciente = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let paciente = await Paciente.destroy({
      where: {
        idPaciente: id,
      },
    });

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

module.exports = {
  obtenerPaciente,
  obtenerPacientes,
  actualizarPaciente,
  elimininarPaciente,
};
