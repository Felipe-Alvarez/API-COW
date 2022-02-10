const Router = require("express");
const router = Router();
const connect = require("../database/connection");

router.get("/lotes", (req, res) => {
  try {
    connect.query("SELECT * FROM `lotes`;", (errs, rows, fields) => {
      if (errs) {
        console.log(errs);
      }
      res.json(rows);
      console.log("Lotes encontrados");
    });
  } catch (error) {
    res.status(503).json({
      status: "503",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

router.get("/lotes/:id", (req, res) => {
  try {
    const { id } = req.params;
    connect.query(
      `SELECT * FROM lotes WHERE ID_LOTE =?`,
      [id],
      (errs, rows, fields) => {
        if (!errs) {
          console.log(errs);
        }
        if (!rows[0]) {
          res.json({ message: "Este lote no existe" });
          console.log("Lote no encontrado");
        } else {
          res.json(rows[0]);
          console.log("Lote encontrado");
        }
      }
    );
  } catch (error) {
    res.status(503),
      json({
        status: "503",
        type: "FAILED",
        message: "Fail to connect database",
      });
    console.log(error);
  }
});

router.post("/lotes/agregar", (req, res) => {
  try {
    const {
      ID_LOTE,
      CANTIDAD_GANADO_LOTE,
      FECHA_LOTE,
      TIPO_LOTE,
      IDENTIFICACION_USUARIO,
    } = req.body;
    let dataUser = [
      ID_LOTE,
      CANTIDAD_GANADO_LOTE,
      FECHA_LOTE,
      TIPO_LOTE,
      IDENTIFICACION_USUARIO,
    ];
    let insertUser = `INSERT INTO lotes(ID_LOTE, CANTIDAD_GANADO_LOTE, FECHA_LOTE, TIPO_LOTE) VALUES (?,?,?,?)`;
    connect.query(insertUser, dataUser, (errs, results, fields) => {
      if (errs) return console.error(errs.message);
      res.json({ status: "200", type: "OK", message: "Lote creado" });
      console.log("Lote creado");
    });
  } catch (error) {
    res.status(503).json({
      status: "503",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error);
  }
});

router.put("/lotes/editar/:id", (req, res) => {
  try {
    const { CANTIDAD_GANADO_LOTE, FECHA_LOTE, TIPO_LOTE } = req.body;
    const { id } = req.params;
    let dataUser = [CANTIDAD_GANADO_LOTE, FECHA_LOTE, TIPO_LOTE, id];
    connect.query(
      `UPDATE lotes SET CANTIDAD_GANADO_LOTE =?, FECHA_LOTE =?, TIPO_LOTE =? WHERE ID_LOTE =?`,
      dataUser,
      (errs, rows, fields) => {
        if (errs) {
          return console.error(errs);
        } else {
          res.json({
            status: "200",
            type: "OK",
            message: "Datos actualizados",
          });
          console.log("Lotes actualizado");
        }
      }
    );
  } catch (error) {
    res.status(503).json({
      status: "503",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error);
  }
});

router.delete("/lotes/eliminar/:id", (req, res) => {
  const { id } = req.params;
  try {
    connect.query(
      `DELETE FROM lotes WHERE ID_LOTE =?`,
      [id],
      (errs, rows, fields) => {
        if (errs) {
          console.log(errs);
        }
        res.json({
          status: "200",
          type: "OK",
          message: "Lote eliminado",
          user: id,
        });
      }
    );
  } catch (error) {
    res.status(503).json({
      status: "503",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error);
  }
});

module.exports = router;
