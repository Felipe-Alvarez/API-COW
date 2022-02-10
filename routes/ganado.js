const Router = require("express");
const router = Router();
const connect = require("../database/connection");

router.get(`/ganado`, (req, res) => {
  try {
    connect.query("SELECT * FROM ganado", (errs, rows, fields) => {
      if (errs) {
        console.log(errs);
      }
      res.json(rows);
      console.log("Ganado total encontrado");
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

router.get("/ganado/:id", (req, res) => {
  try {
    const { id } = req.params;
    connect.query(
      `SELECT * FROM ganado WHERE ID_GANADO =?`,
      [id],
      (errs, rows, fields) => {
        if (!errs) {
          console.log(errs);
        }
        if (!rows[0]) {
          res.json({ message: "Este ganado no existe" });
          console.log("Ganado no encontrado");
        } else {
          res.json(rows[0]);
          console.log("Ganado encontrado");
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

router.post("/ganado/agregar", (req, res) => {
  try {
    const { ID_GANADO, NOMBRE_GANADO, RAZA_GANADO, TIPO_GANADO } = req.body;
    let dataGanado = [ID_GANADO, NOMBRE_GANADO, RAZA_GANADO, TIPO_GANADO];
    let insertGanado = `INSERT INTO ganado(ID_GANADO, NOMBRE_GANADO, RAZA_GANADO, TIPO_GANADO) VALUES (?, ?, ?, ?)`;

    connect.query(insertGanado, dataGanado, (errs, results, fields) => {
      if (errs) {
        console.log(errs);
      }
      res.json({ status: "200", type: "OK", message: "Ganado creado" });
      console.log("Ganado agregado");
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

router.put("/ganado/editar/:id", (req, res) => {
  try {
    const { NOMBRE_GANADO, RAZA_GANADO, TIPO_GANADO } = req.body;
    const { id } = req.params;
    let dataGanado = [NOMBRE_GANADO, RAZA_GANADO, TIPO_GANADO, id];
    connect.query(
      `UPDATE ganado SET NOMBRE_GANADO =?, RAZA_GANADO =?, TIPO_GANADO =? WHERE ID_GANADO =?`,
      dataGanado,
      (errs, rows, fields) => {
        if (errs) {
          return console.error(errs);
        }
        res.json({ status: "200", type: "OK", message: "Datos actualizados" });
        console.log("Ganado actualizado");
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

router.delete("/ganado/eliminar/:id", (req, res) => {
  const { id } = req.params;
  try {
    connect.query(
      `DELETE FROM ganado WHERE ID_GANADO =?`,
      [id],
      (errs, rows, fields) => {
        if (errs) {
          console.log(errs);
        }
        res.json({
          status: "200",
          type: "OK",
          message: "Ganado eliminado",
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
