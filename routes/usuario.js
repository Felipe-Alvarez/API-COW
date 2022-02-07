const Router = require("express");
const router = Router();
const connect = require("../database/connection");

router.get("/usuario", (req, res) => {
  try {
    console.log("Conexión exitosa");
    connect.query("SELECT * FROM `usuarios`;", (err, row, fields) => {
      if (err) {
        res.status(503).json({ message: "Error en el servidor", err: true });
      }
      res.json(row);
    });
  } catch (error) {
    res.status(503).json({ message: "Fail to connect database", err: true });
  }
  console.log(`Error on port ${process.env.PUERTO}`);
});

router.get(`/usuario/:id`, (req, res) => {
  try {
    console.log("Datos /:documento/ exitoso");
    const { id } = req.params;
    connect.query(
      "SELECT * FROM `usuarios` WHERE IDENTIFICACION_USUARIO =? ",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows[0]);
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(`Error on port ${process.env.PUERTO}`);
  }
});

module.exports = router;
