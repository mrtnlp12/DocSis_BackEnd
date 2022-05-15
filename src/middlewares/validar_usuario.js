const Usuario = require("../resources/usuario/models/Usuario");

const validarUsuario = async (req, res, next) => {
  try {
    let usuario = await Usuario.findByPk(req.idUsuario);
    if (!usuario) {
      return res.status(401).json({
        message: "Usuario no registrado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema con el servidor",
    });
  }
};

module.exports = { validarUsuario };
