const express = require('express');
const morgan = require('morgan');
const app = express();
// const user = Math.floor(Math.random(58 - 58961)*58961)-58961


app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'));
// app.use(cors())

app.get("/", (req, res) => {
  res.send(`Hola ${app.get('port')}`)
});

app.post("/post/", (req, res) => {
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

app.set('port', process.env.PUERTO || 5000);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

app.use('/api', require("./routes/usuario"));