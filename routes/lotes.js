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
      status: "504",
      type: "FAILED",
      message: "Fail to connect database",
    });
    console.log(error, "Error en el servidor");
  }
});

module.exports = router;
