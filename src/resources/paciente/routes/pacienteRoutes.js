const { Router } = require("express");
const { validarJwt } = require("../../../middlewares/validar_jwt");
const { validarUsuario } = require("../../../middlewares/validar_usuario");
const {
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  elimininarPaciente,
} = require("../controllers/pacienteController");
const router = Router();

router.get("/", [validarJwt, validarUsuario], obtenerPacientes);
router.get("/:id", [validarJwt, validarUsuario], obtenerPaciente);
router.put("/:id", [validarJwt, validarUsuario], actualizarPaciente);
router.delete("/:id", [validarJwt, validarUsuario], elimininarPaciente);

module.exports = router;
