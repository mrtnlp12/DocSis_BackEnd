const { Router } = require("express");
const { validarJwt } = require("../../../middlewares/validar_jwt");
const { validarUsuario } = require("../../../middlewares/validar_usuario");
const {
  obtenerCitas,
  crearCita,
  agregarCita,
} = require("../controllers/citasControllers");

const router = Router();

router.get("/:id", [validarJwt, validarUsuario], obtenerCitas);
router.post("/", [validarJwt, validarUsuario], crearCita);
router.post("/nueva/:id", [validarJwt, validarUsuario], agregarCita);

module.exports = router;
