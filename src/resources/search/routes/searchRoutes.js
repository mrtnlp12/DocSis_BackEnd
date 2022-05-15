const { Router } = require("express");
const { validarJwt } = require("../../../middlewares/validar_jwt");
const { validarUsuario } = require("../../../middlewares/validar_usuario");
const { searchPacientes } = require("../controllers/searchController");

const router = Router();

router.get("/:termino", [validarJwt, validarUsuario], searchPacientes);

module.exports = router;
