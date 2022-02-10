const Router = require("express");
const router = Router();
const connect = require("../database/connection");

router.get(`/vacunas`, (req, res) => {
  try {
    connect.query("SELECT * FROM vacunas", (errs, rows, fields) => {
      if (errs) {
        console.log(errs);
      }
      res.json(rows);
      console.log("Vacunas total encontradas");
    });
  } catch (error) {
    res.status(503),
      json({
        status: "503",
        type: "FAILED",
        message: "Fail to connect database",
      });
    console.error(error);
  }
});

router.get("/vacunas/:id", (req, res) => {
  try {
    const { id } = req.params;
    connect.query(
      `SELECT * FROM vacunas WHERE ID_VACUNA =?`,
      [id],
      (errs, rows, fields) => {
        if (!errs) {
          console.log(errs);
        }
        if (!rows[0]) {
          res.json({ message: "Esta vacuna no existe" });
          console.log("Vacunas no encontradas");
        } else {
          res.json(rows[0]);
          console.log("Vacunas encontradas");
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

router.post("/vacunas/agregar", (req, res) => {
  try {
    const {
      ID_VACUNA,
      NOMBRE_VACUNA,
      FECHA_APLICACION_VACUNA,
      ESTADO_VACUNA,
      ID_GANADO,
    } = req.body;
    let dataVacunas = [
      ID_VACUNA,
      NOMBRE_VACUNA,
      FECHA_APLICACION_VACUNA,
      ESTADO_VACUNA,
      ID_GANADO,
    ];
    let insertVacunas = `INSERT INTO vacunas(ID_VACUNA, NOMBRE_VACUNA, FECHA_APLICACION_VACUNA, ESTADO_VACUNA, ID_GANADO) VALUES (?, ?, ?, ?, ?)`;

    connect.query(insertVacunas, dataVacunas, (errs, results, fields) => {
      if (errs) {
        console.log(errs);
      }
      res.json({ status: "200", type: "OK", message: "Vacunas creadas" });
      console.log("Vacunas agregadas");
    });
  } catch (error) {
    res.status(503).json({
      status: "503",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.error(error);
  }
});

module.exports = router;
