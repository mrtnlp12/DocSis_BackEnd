const { request, response } = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../../usuario/models/Usuario");
const { generarJwt } = require("../../../helpers/generar_jwt");

const login = async (req = request, res = response) => {
  try {
    const { correo, password } = req.body;
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        message: "El usuario o password no coinciden",
      });
    }

    let token = await generarJwt({ id: usuario.idUsuario });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};
const signup = async (req = request, res = response) => {
  try {
    const { nombre, apellidos, correo, password, telefono } = req.body;
    let usuario = await Usuario.findOne({
      where: {
        correo,
      },
    });

    if (usuario) {
      return res.status(400).json({
        message: "El usuario ya existe en el sistema",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    usuario = await Usuario.create({
      nombre,
      apellidos,
      correo,
      password: hashPass,
      telefono,
    });

    return res.status(201).json({
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

module.exports = {
  login,
  signup,
};
