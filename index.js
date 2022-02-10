const express = require("express");
const morgan = require("morgan");
const app = express();
// const user = Math.floor(Math.random(58 - 58961)*58961)-58961

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
// app.use(cors())

app.get("/", (req, res) => {
  res.send(`<html lang="es">
  <body
    style="
      contain: content;
      margin: auto;
      background-color: rgba(128, 128, 128, 0.363);
      height: 100vh;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    "
  >
    <div
      style="justify-content: center; display: flex; color: white; height: 25%"
    >
      <h1 style="margin: auto">API-COWINDEX</h1>
    </div>
    <div
      style="
        justify-content: center;
        display: flex;
        height: 15%;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 5em;
      "
    >
    Welcome
    </div>
    <div
      style="justify-content: center; display: flex; color: white; height: 25%"
    >
      <h2>© cowindex | 2020</h2>
    </div>
  </body>
</html>`);
});

app.get("/no-found", (req, res) => {
  res.send(`<html lang="es">
              <body
                style="
                  contain: content;
                  margin: auto;
                  background-color: rgba(128, 128, 128, 0.363);
                  height: 100vh;
                  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                "
              >
                <div
                  style="justify-content: center; display: flex; color: white; height: 25%"
                >
                  <h1 style="margin: auto">API-COWINDEX</h1>
                </div>
                <div
                  style="
                    justify-content: center;
                    display: flex;
                    height: 15%;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    font-size: 5em;
                  "
                >
                No existe resultado para la búsqueda
                </div>
                <div
                  style="justify-content: center; display: flex; color: white; height: 25%"
                >
                  <h2>© cowindex | 2020</h2>
                </div>
              </body>
            </html>`);
});

app.post("/post", (req, res) => {
  res.send(`POST REQUEST RECIVED`);
  console.log(req.body);
  console.log(req.params);
});

app.delete("/delete", (req, res) => {
  res.send("DELETE REQUEST RECIVED");
});
app.put("/put", (req, res) => {
  res.send("UPDATE REQUEST RECIVED");
});

app.set("port", process.env.PUERTO || 5000);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

app.use("/api", require("./routes/usuario"));
app.use("/api", require("./routes/ganado"));
app.use("/api", require("./routes/lotes"));
