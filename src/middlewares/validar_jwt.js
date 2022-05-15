const { request } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = (req = request, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        message: "Token no proporcionado",
      });
    }

    const { id } = jwt.verify(token, "aldo");

    req.idUsuario = id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token no validp",
    });
  }
};

module.exports = {
  validarJwt,
};
