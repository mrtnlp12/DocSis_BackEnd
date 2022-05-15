const { request, response } = require("express");
const Paciente = require("../../paciente/models/Paciente");
const Cita = require("../models/Cita");

const obtenerCitas = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(400).json({
        message: "No se econtro ningun usuario con el id " + id,
      });
    }

    console.log("hereeeeee");

    let citas = await paciente.getCitas();
    console.log(citas);
    console.log(paciente);
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

const crearCita = async (req = request, res = response) => {
  try {
    const { nombre, apellidos, edad, correo, telefono, sintomas } = req.body;
    let paciente = await Paciente.findOne({
      where: {
        nombre,
        apellidos,
      },
    });
    let cita;

    if (!paciente) {
      paciente = await Paciente.create({
        nombre,
        apellidos,
        edad,
        correo,
        telefono,
      });
    }

    cita = await Cita.create({
      sintomas,
      pacienteIdPaciente: paciente.idPaciente,
      usuarioIdUsuario: req.usuario.idUsuario,
    });

    res.status(201).json({
      cita,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

const agregarCita = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { sintomas } = req.body;
    let paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(400).json({
        message: `No se encontro el paciente con el id: ${id}`,
      });
    }

    let cita = await paciente.createCita({
      sintomas,
      usuarioIdUsuario: req.usuario.idUsuario,
    });

    console.log("passoooooooo");
    res.status(201).json(cita);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

module.exports = {
  obtenerCitas,
  crearCita,
  agregarCita,
};
