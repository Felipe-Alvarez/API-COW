const Router = require("express");
const router = Router();
const connect = require("../database/connection");

router.get("/usuario", (req, res) => {
  try {
    connect.query("SELECT * FROM `usuarios`;", (err, row, fields) => {
      if (err) {
        console.log(err);
      }
      if (!row) {
        res.json({ message: "Lista de usuarios vacía" });
      }
      res.json(row);
      console.log("Usuaios encontrados");
    });
  } catch (error) {
    res.status(503).json({
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

router.get(`/usuario/:id`, (req, res) => {
  try {
    const { id } = req.params;
    connect.query(
      "SELECT * FROM `usuarios` WHERE IDENTIFICACION_USUARIO =? ",
      [id],
      (err, rows, fields) => {
        if (!err) {
          if (!rows[0]) {
            res.json({ message: "Este usuario no existe" });
            console.log("Usuario no encontrado");
          } else {
            res.json(rows[0]);
            console.log("Usuario encontrado");
          }
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    res.status(503).json({
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

router.post("/usuario/agregar", (req, res) => {
  try {
    const {
      IDENTIFICACION_USUARIO,
      NOMBRE_USUARIO,
      P_APELLIDO_USUARIO,
      CORREO_USUARIO,
      CONTRASENA_USUARIO,
    } = req.body;
    let dataUser = [
      IDENTIFICACION_USUARIO,
      NOMBRE_USUARIO,
      P_APELLIDO_USUARIO,
      CORREO_USUARIO,
      CONTRASENA_USUARIO,
    ];
    let insertUser = `INSERT INTO usuarios(IDENTIFICACION_USUARIO, NOMBRE_USUARIO, P_APELLIDO_USUARIO, CORREO_USUARIO, CONTRASENA_USUARIO) VALUES (?,?,?,?,?)`;
    connect.query(insertUser, dataUser, (errs, results, fields) => {
      if (errs) return console.error(errs.message);
    });
    res.json({ status: "200", type: "OK", message: "Usuario creado" });
    console.log("Usuario creado");
  } catch (error) {
    res.status(503).json({
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

router.put("/usuario/editar/:id", (req, res) => {
  try {
    const {
      NOMBRE_USUARIO,
      P_APELLIDO_USUARIO,
      CORREO_USUARIO,
      CONTRASENA_USUARIO,
    } = req.body;
    const { id } = req.params;
    let dataUser = [
      NOMBRE_USUARIO,
      P_APELLIDO_USUARIO,
      CORREO_USUARIO,
      CONTRASENA_USUARIO,
      id,
    ];
    connect.query(
      `UPDATE usuarios SET NOMBRE_USUARIO =?, P_APELLIDO_USUARIO =?, CORREO_USUARIO =?, CONTRASENA_USUARIO =? WHERE IDENTIFICACION_USUARIO =?`,
      dataUser,
      (errs, rows, fields) => {
        if (errs) {
          return console.error(errs);
        }
        res.json({ status: "200", type: "OK", message: "Datos actualizados" });
        console.log("Usuario actualizado");
      }
    );
  } catch (error) {
    res.status(503).json({
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

router.delete("/usuario/eliminar/:id", (req, res) => {
  const { id } = req.params;
  try {
    connect.query(
      `DELETE FROM usuarios WHERE IDENTIFICACION_USUARIO =?`,
      [id],
      (errs, rows, fields) => {
        if (errs) {
          console.log(errs);
        }
        res.json({
          status: "200",
          type: "OK",
          message: "usuario eliminado",
          user: id,
        });
      }
    );
  } catch (error) {
    res.status(503).json({
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

module.exports = router;
