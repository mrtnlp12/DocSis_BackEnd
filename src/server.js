const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./db/connect");
const Usuario = require("./resources/usuario/models/Usuario");
const Cita = require("./resources/citas/models/Cita");
const Paciente = require("./resources/paciente/models/Paciente");
const app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/citas", require("./resources/citas/routes/citasRoutes"));
app.use("/api/auth", require("./resources/auth/routes/authroutes"));
app.use(
  "/api/pacientes",
  require("./resources/paciente/routes/pacienteRoutes")
);
app.use("/api/search", require("./resources/search/routes/searchRoutes"));

//ASSOCIATIONS

Paciente.hasMany(Cita);
Cita.belongsTo(Paciente);
Usuario.hasMany(Cita);
Cita.belongsTo(Usuario);

//DATABASE
sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
    return;
  })
  .then(() => {
    console.log("Hola");
    sequelize.sync();
  })
  .catch((err) => {
    throw err;
  });

app.listen(3000, () => {
  console.log("Servidor corriendo");
});
